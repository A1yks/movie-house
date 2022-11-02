import bcrypt from 'bcrypt';
import db from '../../db/database';
import { User, UserInfo } from '../../db/models';
import { UserRoles } from '../../db/models/User';
import { TokensService } from '../tokens';
import { UserService } from '../user';

export namespace AuthService {
    export async function register(username: string, password: string, role: UserRoles) {
        const userExists = await UserService.userExists({ username });

        if (userExists) {
            return null;
        }

        const hashedPassword = await hashPassword(password);

        return await db.transaction(async () => {
            const user = await User.create({ username, password: hashedPassword, role });
            const userInfo = await UserInfo.create({ userId: user.id });
            const tokens = await TokensService.issueTokens(userInfo.userId);

            return { userInfo, tokens };
        });
    }

    export async function login(user: User, plaintextPassword: string) {
        const passwordsMatch = await bcrypt.compare(plaintextPassword, user.password);

        if (passwordsMatch) {
            return await TokensService.issueTokens(user.id);
        }

        return null;
    }

    async function hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
}
