import MoviesService from '../../services/movies';
import { UsersService } from '../../services/user';
import logger from '../../utils/logger';
import { FavoritesReq, GetFavoritesReq } from './types';

namespace UsersController {
    async function getUserAndMovie(req: Server.Request<FavoritesReq>, res: Server.Response) {
        const { userId, movieId } = req.body;
        const user = await UsersService.getUser({ id: userId });

        if (user === null) {
            res.status(404).json({ error: "User with given id wasn't found" });
            return null;
        }

        const movie = await MoviesService.getMovie({ id: movieId });

        if (movie === null) {
            res.status(404).json({ error: "Movie with given ud wasn't found" });
            return null;
        }

        return { user, movie };
    }

    export async function addMovieToFavorites(req: Server.Request<FavoritesReq>, res: Server.Response) {
        try {
            const result = await getUserAndMovie(req, res);

            if (result === null) return;

            const { user, movie } = result;

            await UsersService.addMovieToFavorites(user, movie);

            res.status(204).send();
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while adding movie to favorites' });
        }
    }

    export async function removeMovieFromFavorites(req: Server.Request<FavoritesReq>, res: Server.Response) {
        try {
            const result = await getUserAndMovie(req, res);

            if (result === null) return;

            const { user, movie } = result;

            UsersService;
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while removing movie from favorites' });
        }
    }

    export async function getFavoriteMovies(req: Server.Request<GetFavoritesReq>, res: Server.Response) {
        try {
        } catch (err) {}
    }
}

export default UsersController;
