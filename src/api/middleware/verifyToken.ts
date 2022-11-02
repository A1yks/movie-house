import { NextFunction } from 'express';
import TokenService from '../services/tokens/TokensService';
import { TokenPayload } from '../types/tokens';
import logger from '../utils/logger';
import { TokenExpiredError } from 'jsonwebtoken';

function verifyToken(req: Server.Request, res: Server.Response, next: NextFunction) {
    async function handler() {
        try {
            const authHeader = req.headers.authorization;
            const matched = authHeader?.match(/Bearer\s+(.+)$/);

            if (!matched || !matched[1]) {
                return res.status(403).json({ error: 'Authorization token is missing' });
            }

            const token = matched[1];
            const payload = (await TokenService.verifyToken(token)) as TokenPayload;

            req.userId = payload.userId;

            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ error: 'Token expired' });
            }

            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while validating the token' });
        }
    }

    handler();
}

export default verifyToken;
