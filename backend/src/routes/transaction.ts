import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prismaClient = new PrismaClient();

router.get('/', async (req, res) => {
  const transactions = await prismaClient.transaction.findMany({
    where: {
      to: {
        email: req.email,
      },
    },
    select: {
      amount: true,
      to: {
        select: {
          email: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });
  res.json({ transactions });
  return;
});

export default router;
