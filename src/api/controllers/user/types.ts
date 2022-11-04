import { Movie, User } from '../../db/models';

export interface FavoritesReq {
    userId: User['id'];
    movieId: Movie['id'];
}

export interface GetFavoritesReq {
    userId: User['id'];
}
