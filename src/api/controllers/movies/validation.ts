import { MovieAttrs } from 'api/db/models';
import Joi from 'joi';
import { DeleteMovideData, EditMovieData } from './types';

const idSchema = Joi.number().min(1);

const movieAttrsSchema = Joi.object<MovieAttrs>().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ageLimit: Joi.number().min(0).max(21).required(),
    country: Joi.string().required(),
    duration: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(10).required(),
    releaseDate: Joi.date().required(),
});

export const addMovieSchema = movieAttrsSchema;

export const editMovieSchema = movieAttrsSchema.append<EditMovieData>({
    id: idSchema,
});

export const deleteMovieSchema = Joi.object<DeleteMovideData>().keys({
    movieId: idSchema,
});
