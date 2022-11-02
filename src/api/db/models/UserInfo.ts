import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize';
import db from '../database';
import User from './User';

class UserInfo extends Model<InferAttributes<UserInfo>, InferCreationAttributes<UserInfo>> {
    declare id: CreationOptional<number>;
    declare avatar?: string;
    declare userId: ForeignKey<User['id']>;
}

UserInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '/static/images/avatar.jpg',
        },
    },
    { sequelize: db, tableName: 'user_info', timestamps: true }
);

export default UserInfo;
