import { Genres } from 'api/db/models';
import MoviesService from 'api/services/movies';
import { UniqueConstraintError } from 'sequelize';
import logger from '../../utils/logger';
import { AddMovieData, EditMovieData, DeleteMovideData, RateMovieData, SearchMovieQuery } from './types';

namespace MoviesController {
    export async function addMovie(req: Server.Request<AddMovieData>, res: Server.Response) {
        try {
            const movie = await MoviesService.addMovie(req.body);

            res.status(201).json({ data: movie });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while adding new movie' });
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
            res.status(500).json({ error: 'An unexpected error occurred while editing the movie' });
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
            res.status(500).json({ error: 'An unexpected error occurred while deleting the movie' });
        }
    }

    export async function rateMovie(req: Server.Request<RateMovieData>, res: Server.Response) {
        const { movieId, rating: ratingValue } = req.body;

        try {
            const movieExists = await MoviesService.movieExists({ id: movieId });

            if (!movieExists) {
                return res.status(404).json({ error: "Movie with given id doesn't exist" });
            }

            const rating = await MoviesService.rateMovie(req.userId!, movieId, ratingValue);
            const ratedMovie = await rating.getMovie();

            if (ratedMovie === null) {
                return res.status(410).json({ error: 'Movie with given id was deleted' });
            }

            res.status(200).json({ data: ratedMovie.toJSON().rating });
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                return res.status(400).json({ error: 'User with given id has already rated the movie' });
            }

            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while rating the movie' });
        }
    }

    export async function searchMovies(req: Server.Request<unknown, unknown, SearchMovieQuery>, res: Server.Response) {
        const { genres: genresString, ...searchData } = req.query;

        try {
            const genres: Genres[] | undefined = genresString?.split(',').map((genre) => +genre);
            const movies = await MoviesService.searchMovies({ genres, ...searchData });

            res.status(200).json({ data: movies });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while searching the movie' });
        }
    }
}

export default MoviesController;
