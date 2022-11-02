import RefreshToken from '../db/models/RefreshToken';

function setRefreshTokenCookie(res: Server.Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
        maxAge: RefreshToken.expiresIn * 1000,
        httpOnly: true,
        sameSite: true,
        secure: true,
    });
}

export default setRefreshTokenCookie;
