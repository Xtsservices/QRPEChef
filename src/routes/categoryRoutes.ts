import { Router } from 'express';
import { createCategory, getAllCategories, deleteCategory } from '../controllers/categoryController';
import authenticateToken from '../middlewares/authMiddleware';

const router = Router();

router.post('/createCategory', authenticateToken, createCategory);
router.get('/allCategories', authenticateToken, getAllCategories);
router.post('/deleteCategory', authenticateToken, deleteCategory);


export default router;
