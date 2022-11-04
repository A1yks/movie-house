import { Router } from 'express';
import UsersController from '../controllers/user';
import TokensMiddleware from '../middleware/tokens';

const router = Router();

router.get('/', TokensMiddleware.verifyAcessToken, UsersController.getFavoriteMovies);

router.post('/add', TokensMiddleware.verifyAcessToken, UsersController.addMovieToFavorites);

router.delete('/remove', TokensMiddleware.verifyAcessToken, UsersController.removeMovieFromFavorites);

export default router;
