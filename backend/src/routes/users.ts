import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import bcrypyt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { isAuth } from '../middlewares/auth';

const router = Router();
const prismaClient = new PrismaClient();

const signupSchema = z.object({
  name: z.string().min(4),
  email: z.string().min(4),
  password: z.string().min(8).max(16),
});

const signinSchema = z.object({
  email: z.string().min(4),
  password: z.string().min(8).max(16),
});

router.post('/signup', async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (result.success) {
    const { name, email, password } = result.data;
    try {
      const hashedPassword = await bcrypyt.hash(password, 10);
      await prismaClient.account.create({
        data: {
          amount: 50000,
          user: {
            create: {
              name,
              email,
              password: hashedPassword,
            },
          },
        },
      });
      if (process.env.JWT_SECRET) {
        const token = jwt.sign({ name, email }, process.env.JWT_SECRET);
        res.json({ token, message: 'Sign up successful' });
      } else {
        res.status(500).json({ message: 'Server error: Could not generate token.' });
      }
      return;
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Email already taken.' });
    }
  } else {
    res.status(411).json({
      error: result.error,
    });
  }
});

router.post('/signin', async (req, res) => {
  const result = signinSchema.safeParse(req.body);
  if (result.success) {
    const { email, password } = req.body;
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const match = await bcrypyt.compare(password, user.password);
      if (match && process.env.JWT_SECRET) {
        const token = jwt.sign({ name: user.name, email }, process.env.JWT_SECRET);
        res.json({ token, message: 'Sign in successful' });
        return;
      }
    }
    res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.status(401).json({ error: result.error });
  }
});

router.post('/signout', isAuth, (req, res) => {
  res.clearCookie('token').json({ message: 'Sign out successful' });
});

router.get('/', isAuth, async (req, res) => {
  const { filter } = req.query as { filter: string };
  const users = await prismaClient.user.findMany({
    select: {
      email: true,
      name: true,
    },
    where: {
      AND: [
        {
          name: {
            contains: filter,
            mode: 'insensitive',
          },
        },
        {
          email: {
            not: req.email,
          },
        },
      ],
    },
  });
  res.json({ users });
  return;
});

export default router;
