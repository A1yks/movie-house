import jwt from 'jsonwebtoken';
import { User } from 'api/db/models';
import RefreshToken from 'api/db/models/RefreshToken';
import { TokenPayload } from '../../types/tokens';

namespace TokensService {
    export const expiresIn = __DEV__ ? 60 * 60 * 24 * 30 : 60 * 60 * 3;

    export async function issueAccessToken(data: TokenPayload) {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else if (token === undefined) {
                    reject("Token was't created");
                } else {
                    resolve(token);
                }
            });
        });
    }

    export async function issueTokens(userId: User['id']) {
        const accessTokenPromise = issueAccessToken({ userId });
        const refreshTokenPromise = RefreshToken.issueToken(userId);

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

        return { accessToken, refreshToken };
    }

    export async function verifyToken(token: string) {
        return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenPayload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tokenPayload);
                }
            });
        });
    }
}

export default TokensService;
