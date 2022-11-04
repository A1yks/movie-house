import { Movie, MovieAttrs } from '../../db/models';

namespace MoviesService {
    export async function getMovie(movieInfo: Partial<MovieAttrs>) {
        return await Movie.findOne({ where: movieInfo });
    }
}

export default MoviesService;
