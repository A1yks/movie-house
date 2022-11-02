import bind from 'bind-decorator';
import RefreshToken from '../../db/models/RefreshToken';
import AuthService from '../../services/auth/AuthService';
import UserService from '../../services/user/UserService';
import logger from '../../utils/logger';
import { LoginReq, RegisterReq } from './AuthController.types';

class AuthController {
    @bind
    async register(req: Server.Request<RegisterReq>, res: Server.Response) {
        const { username, password, role } = req.body;

        try {
            const data = await AuthService.register(username, password, role);

            if (data === null) {
                return res.status(409).json({ error: 'User with provided username already exists' });
            }

            const { userInfo, tokens } = data;

            this.setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(201).json({ data: { userInfo, accessToken: tokens.accessToken } });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while creating a new user' });
        }
    }

    @bind
    async login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { username, password } = req.body;

        try {
            const user = await UserService.getUser({ username });

            if (user === null) {
                return res.status(404).json({ error: "User with provided username doesn't exist" });
            }

            const tokens = await AuthService.login(user, password);

            if (tokens === null) {
                return res.status(401).json({ error: "Username and/or password doesn't match" });
            }

            const userInfo = await UserService.getUserInfo({ userId: user.id });

            this.setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { userInfo, accessToken: tokens.accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'An unexpected error occurred while trying to logging into account' });
        }
    }

    private setRefreshTokenCookie(res: Server.Response, refreshToken: string) {
        res.cookie('refreshToken', refreshToken, {
            maxAge: RefreshToken.expiresIn * 1000,
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
    }
}

export default new AuthController();
