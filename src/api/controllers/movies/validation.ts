import { MovieAttrs } from 'api/db/models';
import Joi from 'joi';
import { AddMovieData, DeleteMovideData, EditMovieData, RateMovieData, SearchMovieData } from './types';

const idSchema = Joi.number().min(1).required();
const genresSchema = Joi.array().items(Joi.number().integer().min(0));

const movieAttrsSchema = Joi.object<MovieAttrs>().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ageLimit: Joi.number().min(0).max(21).required(),
    country: Joi.string().required(),
    duration: Joi.number().min(0).required(),
    releaseDate: Joi.date().required(),
});

export const addMovieSchema = movieAttrsSchema.append<AddMovieData>({
    genres: genresSchema.required(),
});

export const editMovieSchema = movieAttrsSchema.append<EditMovieData>({
    id: idSchema,
    genres: genresSchema,
});

export const deleteMovieSchema = Joi.object<DeleteMovideData>().keys({
    movieId: idSchema,
});

export const rateMovieSchema = Joi.object<RateMovieData>().keys({
    movieId: idSchema,
    rating: Joi.number().integer().min(1).max(10).required(),
});

export const searchMovieSchema = Joi.object<SearchMovieData>().keys({
    title: Joi.string(),
    ageLimit: Joi.number().integer(),
    country: Joi.string().min(4),
    releaseYear: Joi.number().integer().greater(1900),
    rating: Joi.number().min(1),
    genres: Joi.string().pattern(/(\d+,)*?(\d+)$/),
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
});
