import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, SMALLINT } from 'sequelize';
import db from '../database';

export enum UserRoles {
    GUEST = 0,
    USER = 1,
    ADMIN = 2,
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare role: UserRoles;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(72),
            allowNull: false,
        },
        role: SMALLINT,
    },
    { sequelize: db, tableName: 'users', timestamps: true }
);

export default User;
