import { Model, InferAttributes, InferCreationAttributes, ForeignKey, DataTypes } from 'sequelize';
import db from '../database';
import Movie from './Movie';

export enum Genres {
    FAMILY,
    FANTASY,
    BIOGRAPHICAL,
    ACTION,
    WAR,
    DETECTIVE,
    DRAMA,
    SPORTS,
    FICTION,
    COMEDY,
    MELODRAMA,
    THRILLER,
    HORROR,
    MUSICAL,
    DOCUMENTARY,
    SHORT_FILM,
}

class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
    declare movieId: ForeignKey<Movie['id']>;
    declare genre: Genres;
}

Genre.init(
    {
        genre: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    },
    { sequelize: db, tableName: 'genres' }
);

export default Genre;
