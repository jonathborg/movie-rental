import { Router } from 'express';
import userRoutes from './app/users/routes';

const router = Router();

// TODO: load routes dynamically
router.use('/', userRoutes);

export default router;
