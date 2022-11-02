import { User, UserInfo } from '../../db/models';

class UserService {
    async getUser(userData: Partial<User>) {
        return await User.findOne({ where: userData });
    }

    async getUserInfo(userInfoData: Partial<UserInfo>, include = false) {
        return await UserInfo.findOne({
            where: userInfoData,
            include: include ? { model: User, as: 'user' } : undefined,
        });
    }

    async userExists(userData: Partial<User>) {
        const user = await User.findOne({ where: userData });

        return user !== null;
    }
}

export default new UserService();
