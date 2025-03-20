import express from 'express';
import {
    getAll,
    getOne,
    create,
    edit,
    remove
} from '../controllers/postController';
import { authenticateToken } from '../middleware';

const router = express.Router();

router.get('/posts', getAll);
router.get('/post/:id', getOne);
router.post('/posts', authenticateToken, create);
router.put('/post/:id', authenticateToken, edit);
router.delete('/post/:id', authenticateToken, remove);

export default router;
