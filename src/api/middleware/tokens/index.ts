import { NextFunction } from 'express';
import { TokensService } from '../../services/tokens';
import { TokenPayload } from '../../types/tokens';
import logger from '../../utils/logger';
import { TokenExpiredError } from 'jsonwebtoken';
import { RefreshTokenCookies } from './types';
import RefreshToken from '../../db/models/RefreshToken';

export namespace TokensMiddleware {
    export function verifyAcessToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        async function handler() {
            try {
                const authHeader = req.headers.authorization;
                const matched = authHeader?.match(/Bearer\s+(.+)$/);

                if (!matched || !matched[1]) {
                    return res.status(403).json({ error: 'Authorization token is missing' });
                }

                const token = matched[1];
                const payload = (await TokensService.verifyToken(token)) as TokenPayload;

                req.userId = payload.userId;

                next();
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json({ error: 'Token has expired' });
                }

                logger.error(err);
                res.status(500).json({ error: 'An unexpected error occurred while validating the token' });
            }
        }

        handler();
    }

    export function verifyRefreshToken(req: Server.Request, res: Server.Response, next: NextFunction) {
        async function handler() {
            try {
                const cookies = req.cookies as RefreshTokenCookies;
                const refreshTokenString = cookies.refreshToken;

                if (!refreshTokenString) {
                    return res.status(400).json({ error: "Refresh token was't provided" });
                }

                const refreshToken = await RefreshToken.findOne({ where: { token: refreshTokenString } });

                if (refreshToken === null) {
                    return res.status(400).json({ error: 'Invalid token' });
                }

                const isTokenValid = RefreshToken.verifyToken(refreshToken);

                if (!isTokenValid) {
                    return res.status(400).json({ error: 'Token has expired' });
                }

                const user = await refreshToken.getUser();

                console.log(user);

                if (!user) {
                    return res.status(404).json({ error: 'The user who owns the token was not found' });
                }

                req.userId = user.id;

                next();
            } catch (err) {
                logger.log(err);
                res.status(500).json({ error: 'An unexpected error occurred while validating the token' });
            }
        }

        handler();
    }
}