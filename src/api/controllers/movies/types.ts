import { Movie } from 'api/db/models';
import { MovieAttrs } from 'api/db/models/Movie';

export type AddMovieData = MovieAttrs;

export type EditMovieData = Partial<MovieAttrs>;

export interface DeleteMovideData {
    movieId: Movie['id'];
}
