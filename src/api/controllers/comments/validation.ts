import Joi from 'joi';
import { CreateCommentReq, DeleteCommentReq, EditCommentReq, GetCommentsReq } from './types';

const idSchema = Joi.number().min(1).required();
const commentSchema = Joi.string().min(10).required();

export const getCommentsSchema = Joi.object<GetCommentsReq>().keys({
    movieId: idSchema,
});

export const createCommentSchema = Joi.object<CreateCommentReq>().keys({
    movieId: idSchema,
    comment: commentSchema,
});

export const editCommentSchema = Joi.object<EditCommentReq>().keys({
    commentId: idSchema,
    comment: commentSchema,
});

export const deleteCommentSchema = Joi.object<DeleteCommentReq>().keys({
    commentId: idSchema,
});
