import { Router } from 'express';
import usersRouter from './users';
import accountRouter from './account';

const router = Router();

router.use('/users', usersRouter);
router.use('/account', accountRouter);

export default router;
