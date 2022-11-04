import { Router } from 'express';
import TokensController from '../controllers/tokens';
import TokensMiddleware from '../middleware/tokens';

const router = Router();

router.get('/verify', TokensMiddleware.verifyAcessToken, TokensController.sendVerifiedResponse);

router.get('/renew', TokensMiddleware.verifyRefreshToken, TokensController.renewAccessToken);

export default router;
