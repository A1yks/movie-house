import Joi from 'joi';
import { CreateCommentReq, DeleteCommentReq, EditCommentReq, GetCommentsReq } from './types';

const idSchema = Joi.number().min(1);
const commentSchema = Joi.string().trim().min(1).required();

export const getCommentsSchema = Joi.object<GetCommentsReq>().keys({
    movieId: idSchema.required(),
});

export const createCommentSchema = Joi.object<CreateCommentReq>().keys({
    movieId: idSchema.required(),
    comment: commentSchema,
    replyId: idSchema,
});

export const editCommentSchema = Joi.object<EditCommentReq>().keys({
    commentId: idSchema.required(),
    comment: commentSchema,
});

export const deleteCommentSchema = Joi.object<DeleteCommentReq>().keys({
    commentId: idSchema.required(),
});
