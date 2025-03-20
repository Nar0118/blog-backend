import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(String(password), 10);
    try {
        const user = await prisma.user.create({
            data: { username, password: hashedPassword }
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Username already exists' });
    }
};

export const login = async (req: Request, res: any) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.json({ token });
};
