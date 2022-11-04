import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import db from '../database';

export type MovieAttrs = InferAttributes<Movie>;

class Movie extends Model<MovieAttrs, InferCreationAttributes<Movie>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare rating: number;
    declare releaseDate: Date;
    declare ageLimit: number;
    declare country: string;
    declare duration: number;
}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ageLimit: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        duration: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    },
    { sequelize: db, tableName: 'movies' }
);

export default Movie;
