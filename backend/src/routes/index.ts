import { Router } from 'express';
import usersRouter from './users';
import accountRouter from './account';
import transactionRouter from './transaction';

const router = Router();

router.use('/users', usersRouter);
router.use('/account', accountRouter);
router.use('/transactions', transactionRouter);

export default router;
