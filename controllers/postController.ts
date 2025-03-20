import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface IAuthenticatedRequest extends Request {
    user?: { id: number };
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const searchQuery = req.query.search as string || '';

        const skip = (page - 1) * limit;

        const searchFilter = searchQuery
            ? {
                OR: [
                    { title: { contains: searchQuery, mode: 'insensitive' } },
                    { content: { contains: searchQuery, mode: 'insensitive' } },
                ],
            }
            : {};

        const posts = await prisma.post.findMany({
            where: searchFilter as Prisma.PostWhereInput,
            skip,
            take: limit,
        });

        const totalPosts = await prisma.post.count({
            where: searchFilter as Prisma.PostWhereInput,
        });

        const totalPages = Math.ceil(totalPosts / limit);

        res.json({
            posts,
            pagination: {
                page,
                totalPages,
                totalPosts,
                limit,
            },
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

export const getOne = async (req: Request, res: any) => {
    const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};

export const create = async (req: IAuthenticatedRequest, res: any) => {
    const { title, content } = req.body;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const post = await prisma.post.create({ data: { title, content, authorId: req.user.id } });
    res.json(post);
};

export const edit = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const post = await prisma.post.update({ where: { id: parseInt(req.params.id) }, data: { title, content } });
    res.json(post);
};

export const remove = async (req: Request, res: Response) => {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Post deleted' });
};
