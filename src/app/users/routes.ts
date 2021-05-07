import { Router } from 'express';
import user from './UserModule';

const router = Router();

router.get('/users', user.list);
router.get('/users/:id', user.show);
router.post('/users', user.create);
router.patch('/users/:id', user.edit);
router.delete('/users/:id', user.delete);

export default router;
