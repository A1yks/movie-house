import { AddMovieData, EditMovieData } from '../../controllers/movies/types';
import { Movie } from '../../db/models';
import { MovieAttrs } from '../../db/models/Movie';

namespace MoviesService {
    /**
     * Gets movie from the database by given attributes
     * @param movieData Movies' search data
     * @returns Found movie or null
     */
    export async function getMovie(movieData: Partial<MovieAttrs>) {
        return await Movie.findOne({ where: movieData });
    }

    /**
     * Creates a new movie and saves it to the database
     * @param movieInfo New movie inforamation
     * @returns Instance of a new movie
     */
    export async function addMovie(movieInfo: AddMovieData) {
        return await Movie.create(movieInfo, { raw: true });
    }

    /**
     * Updates existing movie and saves result in the database
     * @param movie Movie to update
     * @param updateData New movie data
     * @returns Updated movie
     */
    export async function editMovide(movie: Movie, updateData: EditMovieData): Promise<Movie> {
        return await movie.update(updateData);
    }

    /**
     * Deletes movie by its id
     * @param movieId Id of a movie to delete
     * @returns The number of destroyed rows
     */
    export async function deleteMovie(movieId: Movie['id']): Promise<number> {
        return await Movie.destroy({ where: { id: movieId } });
    }
}

export default MoviesService;
