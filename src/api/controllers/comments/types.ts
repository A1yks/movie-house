import { CommentAttrs, Movie } from 'api/db/models';

export interface GetCommentsReq {
    movieId: Movie['id'];
}

export interface CreateCommentReq extends Omit<CommentAttrs, 'userId' | 'id' | 'replyId'> {
    replyId?: CommentAttrs['replyId'];
}

export interface EditCommentReq {
    commentId: CommentAttrs['id'];
    comment: string;
}

export interface DeleteCommentReq {
    commentId: CommentAttrs['id'];
}
