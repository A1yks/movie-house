import AuthService from '../../services/auth';
import UserService from '../../services/user';
import logger from '../../utils/logger';
import setRefreshTokenCookie from '../../utils/setRefreshTokenCookie';
import { LoginReq, RegisterReq } from './types';

namespace AuthController {
    export async function register(req: Server.Request<RegisterReq>, res: Server.Response) {
        const { username, password, role } = req.body;

        try {
            const data = await AuthService.register(username, password, role);

            if (data === null) {
                return res.status(409).json({ error: 'User with provided username already exists' });
            }

            const { userInfo, tokens } = data;

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(201).json({ data: { userInfo, accessToken: tokens.accessToken } });
        } catch (err) {
            logger.error(err);
            res.status(500).json({ error: 'An unexpected error occurred while creating a new user' });
        }
    }

    export async function login(req: Server.Request<LoginReq>, res: Server.Response) {
        const { username, password } = req.body;

        try {
            const user = await UsersService.getUser({ username });

            if (user === null) {
                return res.status(404).json({ error: "User with provided username doesn't exist" });
            }

            const tokens = await AuthService.login(user, password);

            if (tokens === null) {
                return res.status(401).json({ error: "Username and/or password doesn't match" });
            }

            const userInfo = await UsersService.getUserInfo({ userId: user.id });

            setRefreshTokenCookie(res, tokens.refreshToken);
            res.status(200).json({ data: { userInfo, accessToken: tokens.accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'An unexpected error occurred while trying to logging into account' });
        }
    }
}

export default AuthController;
