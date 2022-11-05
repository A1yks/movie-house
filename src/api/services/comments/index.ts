import { Comment, CommentAttrs, Movie, User } from 'api/db/models';

namespace CommentsService {
    /**
     * Gets comment from the database and returns its instance
     * @param commentData Data of a comment to find
     * @returns Comment instance or null
     */
    export async function getComment(commentData: Partial<CommentAttrs>) {
        return await Comment.findOne({ where: commentData });
    }

    /**
     * Gets comments from a database and returns array of its instances
     * @param commentData Search data
     * @returns Array of Comment instances
     */
    export async function getComments(commentData: Partial<CommentAttrs>) {
        return await Comment.findAll({ where: commentData });
    }

    /**
     * Creates comment and saves it to the database
     * @param userId User id
     * @param movieId Movie id
     * @param text Comment text
     * @returns Comment instance
     */
    export async function createComment(userId: User['id'], movieId: Movie['id'], text: string) {
        return await Comment.create({ userId, movieId, comment: text });
    }

    /**
     * Updates comment text
     * @param comment Comment instance to be updated
     * @param text New comment text
     * @returns Updated comment instance
     */
    export async function editComment(comment: Comment, text: string) {
        return await comment.update({ comment: text });
    }

    /**
     * Deletes comment from the database
     * @param comment Comment instance
     */
    export async function deleteComment(comment: Comment) {
        await comment.destroy();
    }
}

export default CommentsService;
