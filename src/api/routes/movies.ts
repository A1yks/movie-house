import {
    addMovieSchema,
    deleteMovieSchema,
    editMovieSchema,
    rateMovieSchema,
    searchMovieSchema,
} from 'api/controllers/movies/validation';
import ValidationMiddleware from 'api/middleware/schema-validation';
import { Router } from 'express';
import MoviesController from '../controllers/movies';
import TokensMiddleware from '../middleware/tokens';

const router = Router();

router.get(
    '/',
    ValidationMiddleware.validate(searchMovieSchema, { validateQuery: true }),
    MoviesController.searchMovies
);

router.post(
    '/add',
    TokensMiddleware.verifyAdmin,
    ValidationMiddleware.validate(addMovieSchema),
    MoviesController.addMovie
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAdmin,
    ValidationMiddleware.validate(editMovieSchema),
    MoviesController.editMovie
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAdmin,
    ValidationMiddleware.validate(deleteMovieSchema),
    MoviesController.deleteMovie
);

router.post(
    '/rate',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(rateMovieSchema),
    MoviesController.rateMovie
);

export default router;
