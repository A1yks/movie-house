import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
    HasManyGetAssociationsMixin,
} from 'sequelize';
import db from '../database';
import Movie from './Movie';
import User from './User';

export type CommentAttrs = InferAttributes<Comment>;

class Comment extends Model<CommentAttrs, InferCreationAttributes<Comment>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare movieId: ForeignKey<Movie['id']>;
    declare replyId: ForeignKey<Comment['id']> | null;
    declare comment: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;
    declare replies?: CommentAttrs[];

    declare getComments: HasManyGetAssociationsMixin<Comment>;
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
        replyId: {
            type: DataTypes.INTEGER,
            references: {
                model: Comment,
                key: 'id',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize: db,
        tableName: 'comments',
        timestamps: true,
        paranoid: true,
        // defaultScope: {
        //     include: [
        //         {
        //             model: Comment,
        //             as: 'replies',
        //         },
        //     ],
        // },
    }
);

export default Comment;
