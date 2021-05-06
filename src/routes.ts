import { Router } from 'express';
import userRoutes from './app/users/routes';

// TODO: auto import routes using readFileSync
const router = Router();

router.use('/users', userRoutes);

export default router;
