import MoviesService from 'api/services/movies';
import logger from '../../utils/logger';
import { AddMovieData, EditMovieData, DeleteMovideData } from './types';

namespace MoviesController {
    export async function addMovie(req: Server.Request<AddMovieData>, res: Server.Response) {
        try {
            const movie = await MoviesService.addMovie(req.body);

            res.status(201).json({ data: movie });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while adding new movie' });
        }
    }

    export async function editMovie(req: Server.Request<EditMovieData>, res: Server.Response) {
        const { id, ...movieData } = req.body;

        try {
            const movie = await MoviesService.getMovie({ id });

            if (movie === null) {
                return res.status(404).json({ error: "Movie with given id wasn't found" });
            }

            const updatedMovie = await MoviesService.editMovide(movie, movieData);

            res.status(200).json({ data: updatedMovie });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while editing the movie' });
        }
    }

    export async function deleteMovie(req: Server.Request<DeleteMovideData>, res: Server.Response) {
        const { movieId } = req.body;

        try {
            const movie = await MoviesService.getMovie({ id: movieId });

            if (movie === null) {
                return res.status(404).json({ error: "Movie with given id wasn't found" });
            }

            await MoviesService.deleteMovie(movie);

            res.status(204).send();
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while deleting the movie' });
        }
    }
}

export default MoviesController;
