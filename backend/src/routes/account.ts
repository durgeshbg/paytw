import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prismaClient = new PrismaClient();

const transferSchema = z.object({
  to: z.string().min(1),
  amount: z.number().positive(),
});

router.get('/balance', isAuth, async (req, res) => {
  const account = await prismaClient.account.findFirst({
    where: {
      user: {
        email: req.email,
      },
    },
  });
  if (account) {
    res.json({ balance: account.amount });
    return;
  }
  res.status(404).json({ message: 'No account found!' });
});

router.post('/transfer', isAuth, async (req, res) => {
  const result = transferSchema.safeParse(req.body);
  if (result.success) {
    const { to, amount: txnAmount } = result.data;
    const toAccount = await prismaClient.user.findFirst({ where: { email: to } });
    const fromAccount = await prismaClient.user.findFirst({ where: { email: req.email } });
    if (!toAccount || !fromAccount) {
      res.status(400).json({ message: `Invalid account` });
      return;
    }

    try {
      await prismaClient.$transaction(async (txn) => {
        const sender = await txn.account.update({
          data: {
            amount: {
              decrement: txnAmount,
            },
          },
          where: {
            userId: fromAccount.id,
          },
        });
        if (sender.amount < 0) throw new Error(`${req.email} has insufficient funds.`);
        await txn.account.update({
          data: {
            amount: {
              increment: txnAmount,
            },
          },
          where: {
            userId: toAccount.id,
          },
        });
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: `You have insufficient funds.` });
      return;
    }

    res.json({ message: `Transfer successful` });
  } else {
    res.status(400).json({
      message: 'Invalid inputs',
    });
  }
});

export default router;
