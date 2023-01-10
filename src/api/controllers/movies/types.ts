import { Genres, Movie } from 'api/db/models';
import { MovieAttrs } from 'api/db/models/Movie';

export type AddMovieData = MovieAttrs;

export type EditMovieData = Partial<MovieAttrs>;

export interface DeleteMovideData {
    movieId: Movie['id'];
}

export interface RateMovieData {
    movieId: Movie['id'];
    rating: number;
}

export interface SearchMovieData extends Partial<Pick<MovieAttrs, 'title' | 'rating' | 'country' | 'ageLimit'>> {
    releaseYear?: number;
    genres?: Genres[];
    limit?: number;
    offset?: number;
}

export interface SearchMovieQuery extends Omit<SearchMovieData, 'genres'> {
    genres?: string;
}
