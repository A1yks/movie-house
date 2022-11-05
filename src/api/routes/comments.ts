import CommentsController from 'api/controllers/comments';
import {
    createCommentSchema,
    deleteCommentSchema,
    editCommentSchema,
    getCommentsSchema,
} from 'api/controllers/comments/validation';
import ValidationMiddleware from 'api/middleware/schema-validation';
import TokensMiddleware from 'api/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.get(
    '/:movieId',
    ValidationMiddleware.validate(getCommentsSchema, { validateParams: true }),
    CommentsController.getComments
);

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createCommentSchema),
    CommentsController.createComment
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editCommentSchema),
    CommentsController.editComment
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteCommentSchema),
    CommentsController.deleteComment
);

export default router;
