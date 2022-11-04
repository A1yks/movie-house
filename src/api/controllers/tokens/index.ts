import TokensService from '../../services/tokens';
import setRefreshTokenCookie from '../../utils/setRefreshTokenCookie';

namespace TokensController {
    export function sendVerifiedResponse(req: Server.Request, res: Server.Response) {
        res.status(204).send();
    }

    export async function renewAccessToken(req: Server.Request, res: Server.Response) {
        if (!req.userId) {
            return res.status(401).json({ error: 'User is not defined' });
        }

        try {
            const { accessToken, refreshToken } = await TokensService.issueTokens(req.userId);

            setRefreshTokenCookie(res, refreshToken);
            res.status(201).json({ data: { accessToken } });
        } catch (err) {
            res.status(500).json({ error: 'An unexpected error occured while issuing new tokens' });
        }
    }
}

export default TokensController;
