import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { isAuth } from '../middlewares/auth';

const router = Router();
const prismaClient = new PrismaClient();

router.get('/', isAuth, async (req, res) => {
  const [transactionsSent, transactionsReceived] = await Promise.all([
    prismaClient.transaction.findMany({
      where: {
        from: {
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
    }),
    prismaClient.transaction.findMany({
      where: {
        to: {
          email: req.email,
        },
      },
      select: {
        amount: true,
        from: {
          select: {
            email: true,
            name: true,
          },
        },
        createdAt: true,
      },
    }),
  ]);
  res.json({ sent: transactionsSent, received: transactionsReceived });
  return;
});

export default router;
