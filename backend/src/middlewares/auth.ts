import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (token && process.env.JWT_SECRET) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET) as { email: string };
      req.email = data.email;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token, Signin required' });
      return;
    }
  } else {
    res.status(401).json({ message: 'Invalid token, Signin required' });
  }
}
