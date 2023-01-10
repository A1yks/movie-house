import { AddMovieData, EditMovieData, SearchMovieData } from '../../controllers/movies/types';
import { Genre, Movie, User } from 'api/db/models';
import { MovieAttrs } from 'api/db/models/Movie';
import { Includeable, Op, Sequelize, WhereOptions } from 'sequelize';
import Rating from 'api/db/models/Rating';

namespace MoviesService {
    /**
     * Gets movie from the database by given attributes
     * @param movieData Movie search data
     * @returns Movie instance or null
     */
    export async function getMovie(movieData: Partial<MovieAttrs>) {
        return await Movie.findOne({ where: movieData });
    }

    /**
     * Gets movies from the database by given attributes
     * @param movideData Movies search data
     * @returns Array of Movie instances
     */
    export async function getMovies(movideData: Partial<MovieAttrs>) {
        return await Movie.findAll({ where: movideData });
    }

    /**
     * Searchs for movies by given title
     * @param searchParams Movies search params
     * @param limit Maximum number of returned movies
     * @returns Array of Movie instances whose full title includes provided title
     */
    export async function searchMovies({
        title,
        releaseYear,
        country,
        ageLimit,
        rating,
        genres,
        limit = 20,
        offset = 0,
    }: SearchMovieData) {
        const include: Includeable[] = [];
        const and: WhereOptions<MovieAttrs>[] = [];
        const queryObj: WhereOptions<MovieAttrs> = {
            [Op.and]: and,
        };

        if (title !== undefined) {
            and.push({
                title: {
                    [Op.iLike]: `%${title}%`,
                },
            });
        }

        if (releaseYear !== undefined) {
            and.push(
                Sequelize.where(Sequelize.fn('date_part', 'year', Sequelize.col('Movie.releaseDate')), releaseYear)
            );
        }

        if (country !== undefined) {
            and.push({ country });
        }

        if (ageLimit !== undefined) {
            and.push({
                ageLimit: {
                    [Op.gte]: ageLimit,
                },
            });
        }

        if (rating !== undefined) {
            and.push({
                '$ratings.value$': {
                    [Op.gte]: rating,
                },
            });
        }

        if (genres !== undefined) {
            include.push({
                model: Movie,
                as: 'selfJoin',
                include: [
                    {
                        model: Genre,
                        where: {
                            genre: genres,
                        },
                        attributes: [],
                    },
                ],
                required: true,
                attributes: [],
            });
        }

        console.log(include.length > 0);

        return await Movie.findAll({
            where: queryObj,
            include: include.length > 0 ? include : undefined,
            limit,
            offset,
        });
    }

    /**
     * Checks if movie exists or not
     * @param movieData Movie's search data
     * @returns True if movie exists, false otherwise
     */
    export async function movieExists(movieData: Partial<MovieAttrs>) {
        const movie = await getMovie(movieData);

        return movie !== null;
    }

    /**
     * Creates a new movie and saves it to the database
     * @param movieInfo New movie inforamation
     * @returns Instance of a new movie
     */
    export async function addMovie({ genres, ...movieInfo }: AddMovieData) {
        const movie = await Movie.create(movieInfo);

        await Promise.all([genres?.map((genre) => movie.createGenre({ genre }))]);

        movie.setDataValue('genres', genres);
        movie.setDataValue('rating', null);

        return movie;
    }

    /**
     * Updates existing movie and saves result in the database
     * @param movie Movie to update
     * @param updateData New movie data
     * @returns Updated movie
     */
    export async function editMovide(movie: Movie, { genres, ...updateData }: EditMovieData): Promise<Movie> {
        const [updatedMovie] = await Promise.all([
            movie.update(updateData),
            // genres?.map((genre) => Genre.update({ genre }, { where: { movieId: updateData.id } })),
        ]);

        return updatedMovie;
    }

    /**
     * Deletes movie by its id
     * @param movie Movie instance to delete
     */
    export async function deleteMovie(movie: Movie) {
        await movie.destroy();
    }

    /**
     * Gets average movie rating from the database
     * @param movieId Movie id
     * @returns Movie instance with 'rating' field
     */
    export async function getMovieRating(movieId: Movie['id']) {
        return await Movie.findOne({
            where: { id: movieId },
            include: {
                model: Rating,
                as: 'ratings',
                attributes: [],
            },
            attributes: {
                include: [[Sequelize.fn('AVG', Sequelize.col('ratings.value')), 'rating']],
            },
            group: ['Movie.id'],
        });
    }

    /**
     * Saves the rating the user has given to the movie
     * @param userId User id
     * @param movieId Movie id
     * @param rating Rating value
     * @returns Rating instance
     */
    export async function rateMovie(userId: User['id'], movieId: Movie['id'], rating: number) {
        return await Rating.create({ userId, movieId, value: rating });
    }
}

export default MoviesService;
