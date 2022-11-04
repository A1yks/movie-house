import logger from '../../utils/logger';
import { AddMovieData, EditMovieData, DeleteMovideData } from './types';

namespace MoviesController {
    export function addMovie(req: Server.Request<AddMovieData>, res: Server.Response) {
        try {
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while adding new movie' });
        }
    }

    export function editMovie(req: Server.Request<EditMovieData>, res: Server.Response) {
        try {
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while editing the movie' });
        }
    }

    export function deleteMovie(req: Server.Request<DeleteMovideData>, res: Server.Response) {
        try {
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while deleting the movie' });
        }
    }
}

export default MoviesController;
