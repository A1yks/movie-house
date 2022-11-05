import { AddMovieData, EditMovieData } from '../../controllers/movies/types';
import { Movie } from 'api/db/models';
import { MovieAttrs } from 'api/db/models/Movie';

namespace MoviesService {
    /**
     * Gets movie from the database by given attributes
     * @param movieData Movie's search data
     * @returns Found movie or null
     */
    export async function getMovie(movieData: Partial<MovieAttrs>) {
        return await Movie.findOne({ where: movieData });
    }

    /**
     * Checks if movie exists or not
     * @param movieData Movie's search data
     * @returns True if movie exists, false otherwise
     */
    export async function movieExists(movieData: Partial<MovieAttrs>) {
        const movie = await getMovie(movieData);

        return movie !== null;
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
     * @param movie Movie instance to delete
     */
    export async function deleteMovie(movie: Movie) {
        await movie.destroy();
    }
}

export default MoviesService;
