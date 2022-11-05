import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import db from '../database';
import Movie from './Movie';
import User from './User';

export type CommentAttrs = InferAttributes<Comment>;

class Comment extends Model<CommentAttrs, InferCreationAttributes<Comment>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare movieId: ForeignKey<Movie['id']>;
    declare comment: string;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'comments',
    }
);

export default Comment;
