import { Model, InferAttributes, InferCreationAttributes, ForeignKey, DataTypes, CreationOptional } from 'sequelize';
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
    declare id: CreationOptional<number>;
    declare movieId: ForeignKey<Movie['id']>;
    declare genre: Genres;
}

Genre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        genre: {
            type: DataTypes.SMALLINT,
            allowNull: false,
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
    { sequelize: db, tableName: 'genres' }
);

export default Genre;
