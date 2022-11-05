import { CommentAttrs, Movie } from 'api/db/models';

export interface GetCommentsReq {
    movieId: Movie['id'];
}

export type CreateCommentReq = Omit<CommentAttrs, 'userId'>;

export interface EditCommentReq {
    commentId: CommentAttrs['id'];
    comment: string;
}

export interface DeleteCommentReq {
    commentId: CommentAttrs['id'];
}
