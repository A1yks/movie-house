import CommentsService from 'api/services/comments';
import MoviesService from 'api/services/movies';
import UsersService from 'api/services/user';
import logger from 'api/utils/logger';
import { CreateCommentReq, DeleteCommentReq, EditCommentReq, GetCommentsReq } from './types';

namespace CommentsController {
    export async function getComments(req: Server.Request<unknown, GetCommentsReq>, res: Server.Response) {
        const { movieId } = req.params;

        try {
            const comments = await CommentsService.getComments({ movieId });

            res.status(200).json({ data: comments });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while getting comments' });
        }
    }

    export async function createComment(req: Server.Request<CreateCommentReq>, res: Server.Response) {
        const { movieId, comment: commentText } = req.body;

        try {
            const [userExists, movieExists] = await Promise.all([
                UsersService.userExists({ id: req.userId }),
                MoviesService.movieExists({ id: movieId }),
            ]);

            if (!userExists) {
                return res.status(404).json({ error: "User with given id doesn't exist" });
            }

            if (!movieExists) {
                return res.status(404).json({ error: "Movie with given id doesn't exist" });
            }

            const comment = await CommentsService.createComment(req.userId!, movieId, commentText);

            res.status(201).json({ data: comment });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while creating new comment' });
        }
    }

    export async function editComment(req: Server.Request<EditCommentReq>, res: Server.Response) {
        const { commentId, comment: commentText } = req.body;

        try {
            const comment = await CommentsService.getComment({ id: commentId });

            if (comment === null) {
                return res.status(404).json({ error: "Comment with given id doesn't exist" });
            }

            const updatedComment = await CommentsService.editComment(comment, commentText);

            res.status(200).json({ data: updatedComment });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while editing the comment' });
        }
    }

    export async function deleteComment(req: Server.Request<DeleteCommentReq>, res: Server.Response) {
        const { commentId } = req.body;

        try {
            const comment = await CommentsService.getComment({ id: commentId });

            if (comment === null) {
                return res.status(404).json({ error: "Comment with given id doesn't exist" });
            }

            await CommentsService.deleteComment(comment);

            res.status(204).send();
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occured while deleting the comment' });
        }
    }
}

export default CommentsController;
