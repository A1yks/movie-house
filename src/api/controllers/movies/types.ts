import { InferCreationAttributes } from 'sequelize';
import { Movie } from '../../db/models';
import { MovieAttrs } from '../../db/models/Movie';

export type AddMovieData = MovieAttrs;

export type EditMovieData = Partial<AddMovieData>;

export interface DeleteMovideData {
    movieId: Movie['id'];
}
