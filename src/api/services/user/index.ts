import { User, UserInfo } from '../../db/models';

export namespace UserService {
    export async function getUser(userData: Partial<User>) {
        return await User.findOne({ where: userData });
    }

    export async function getUserInfo(userInfoData: Partial<UserInfo>, include = false) {
        return await UserInfo.findOne({
            where: userInfoData,
            include: include ? { model: User, as: 'user' } : undefined,
        });
    }

    export async function userExists(userData: Partial<User>) {
        const user = await User.findOne({ where: userData });

        return user !== null;
    }
}
