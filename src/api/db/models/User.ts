import {
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    SMALLINT,
} from 'sequelize';
import db from '../database';
import Movie from './Movie';

export enum UserRoles {
    GUEST = 0,
    USER = 1,
    ADMIN = 2,
}

export type UserAttrs = InferAttributes<User>;

class User extends Model<UserAttrs, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare role: UserRoles;

    declare addMovie: HasManyAddAssociationMixin<Movie, Movie['id']>;
    declare removeMovie: HasManyAddAssociationMixin<Movie, Movie['id']>;
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
    {
        sequelize: db,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    }
);

export default User;
