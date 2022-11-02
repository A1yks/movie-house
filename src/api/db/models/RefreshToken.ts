import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import db from '../database';
import User from './User';

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
    declare token: string;
    declare userId: ForeignKey<User['id']>;
    declare expirityDate: Date;

    static expiresIn = 60 * 60 * 24 * 7; // 7 days (in secods)

    static async issueToken(userId: User['id']) {
        const expireAt = new Date();

        expireAt.setSeconds(expireAt.getSeconds() + this.expiresIn);

        const refreshToken = this.build({
            token: uuidv4(),
            userId,
            expirityDate: expireAt,
        });
        const oldToken = await this.findOne({ where: { userId } });

        if (oldToken === null) {
            await refreshToken.save();
        } else {
            await this.update(
                { token: refreshToken.token, expirityDate: refreshToken.expirityDate },
                { where: { userId } }
            );
        }

        return refreshToken.token;
    }

    static verifyToken(token: RefreshToken) {
        return token.expirityDate.getTime() < Date.now();
    }
}

RefreshToken.init(
    {
        token: {
            type: DataTypes.STRING(36),
            allowNull: false,
        },
        expirityDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { sequelize: db, tableName: 'refresh_tokens' }
);

export default RefreshToken;
