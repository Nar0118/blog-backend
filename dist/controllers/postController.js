"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.edit = exports.create = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const searchQuery = req.query.search || '';
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
            where: searchFilter,
            skip,
            take: limit,
        });
        const totalPosts = await prisma.post.count({
            where: searchFilter,
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
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!post)
        return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};
exports.getOne = getOne;
const create = async (req, res) => {
    const { title, content } = req.body;
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const post = await prisma.post.create({ data: { title, content, authorId: req.user.id } });
    res.json(post);
};
exports.create = create;
const edit = async (req, res) => {
    const { title, content } = req.body;
    const post = await prisma.post.update({ where: { id: parseInt(req.params.id) }, data: { title, content } });
    res.json(post);
};
exports.edit = edit;
const remove = async (req, res) => {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Post deleted' });
};
exports.remove = remove;
