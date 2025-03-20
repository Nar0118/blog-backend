import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthenticatedRequest } from './controllers/postController';

export const authenticateToken = (req: IAuthenticatedRequest, res: any, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user as { id: number };
        next();
    });
};