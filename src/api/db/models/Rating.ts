import {
    BelongsToGetAssociationMixin,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import db from '../database';
import Movie from './Movie';
import User from './User';

class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
    declare userId: ForeignKey<User['id']>;
    declare movieId: ForeignKey<Movie['id']>;
    declare value: number;

    declare getMovie: BelongsToGetAssociationMixin<Movie>;
}

Rating.init(
    {
        value: {
            type: DataTypes.SMALLINT,
            defaultValue: 0,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            unique: 'compositeIndex',
        },
        movieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Movie,
                key: 'id',
            },
            unique: 'compositeIndex',
        },
    },
    {
        tableName: 'ratings',
        sequelize: db,
    }
);

export default Rating;
