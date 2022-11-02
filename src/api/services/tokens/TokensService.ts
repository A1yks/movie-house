import jwt from 'jsonwebtoken';
import { User } from '../../db/models';
import RefreshToken from '../../db/models/RefreshToken';
import { TokenPayload } from '../../types/tokens';

class TokensService {
    expiresIn = 60 * 60 * 24; // 1 day (in seconds)

    async issueAccessToken(data: TokenPayload) {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: this.expiresIn }, (err, token) => {
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

    async issueTokens(userId: User['id']) {
        const accessTokenPromise = this.issueAccessToken({ userId });
        const refreshTokenPromise = RefreshToken.issueToken(userId);

        const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

        return { accessToken, refreshToken };
    }

    async verifyToken(token: string) {
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

export default new TokensService();
