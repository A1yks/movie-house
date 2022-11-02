import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { loginSchema, registrationSchema } from '../controllers/auth/validation';
import { ValidationMiddleware } from '../middleware/schema-validation';

const router = Router();

router.post('/login', ValidationMiddleware.validate(loginSchema), AuthController.login);

router.post('/register', ValidationMiddleware.validate(registrationSchema), AuthController.register);

export default router;
