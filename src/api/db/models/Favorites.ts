import { Model, InferAttributes, InferCreationAttributes, ForeignKey, DataTypes } from 'sequelize';
import db from '../database';
import Movie from './Movie';
import User from './User';

class Favorites extends Model<InferAttributes<Favorites>, InferCreationAttributes<Favorites>> {
    declare movieId: ForeignKey<Movie['id']>;
    declare userId: ForeignKey<User['id']>;
}

Favorites.init(
    {
        movieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Movie,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    { sequelize: db, tableName: 'favorites' }
);

export default Favorites;
