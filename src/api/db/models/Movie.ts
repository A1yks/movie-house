import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    HasManyCreateAssociationMixin,
} from 'sequelize';
import db from '../database';
import Genre, { Genres } from './Genre';
import Rating from './Rating';

export type MovieAttrs = InferAttributes<Movie>;

class Movie extends Model<MovieAttrs, InferCreationAttributes<Movie>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare releaseDate: Date;
    declare ageLimit: number;
    declare country: string;
    declare duration: number;
    declare rating?: number | null;
    declare genres?: Genres[];

    declare createGenre: HasManyCreateAssociationMixin<Genre>;
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
    {
        sequelize: db,
        tableName: 'movies',
        defaultScope: {
            include: [
                {
                    model: Rating,
                    as: 'ratings',
                    attributes: [],
                },
                {
                    model: Genre,
                    attributes: [],
                },
            ],
            attributes: {
                include: [
                    [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('ratings.value')), 2), 'rating'],
                    [Sequelize.fn('array_agg', Sequelize.col('Genres.genre')), 'genres'],
                ],
            },
            order: [['id', 'ASC']],
            group: ['Movie.id'],
            subQuery: false,
        },
    }
);

export default Movie;
