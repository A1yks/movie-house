import { Router } from 'express';
import MoviesController from '../controllers/movies';
import TokensMiddleware from '../middleware/tokens';

const router = Router();

router.post('/add', TokensMiddleware.verifyAdmin, MoviesController.addMovie);

router.patch('/edit', TokensMiddleware.verifyAdmin, MoviesController.editMovie);

router.delete('/delete', TokensMiddleware.verifyAdmin, MoviesController.deleteMovie);

export default router;
