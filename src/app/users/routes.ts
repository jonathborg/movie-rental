import { Router } from 'express';
import user from './UserModule';

const router = Router();

router.get('/', user.controller.index);
router.post('/', user.controller.create);

export default router;
