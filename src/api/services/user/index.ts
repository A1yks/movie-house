import { Movie, User, UserAttrs, UserInfo, UserInfoAttrs } from '../../db/models';

export namespace UsersService {
    /**
     * Gets user from the database and returns its instance
     * @param userData Data of a user to find
     * @returns User instance
     */
    export async function getUser(userData: Partial<UserAttrs>) {
        return await User.findOne({ where: userData });
    }

    /**
     * Gets public information about user and returns UserInfo instance
     * @param userInfoData User public info search data
     * @param include Determines wheter to include user instance or not
     * @returns UserInfo instance
     */
    export async function getUserInfo(userInfoData: Partial<UserInfoAttrs>, include = false) {
        return await UserInfo.findOne({
            where: userInfoData,
            include: include ? { model: User, as: 'user' } : undefined,
        });
    }

    /**
     * Checks if user exists or not
     * @param userData Data of a user to find
     * @returns User instance if user was found or null otherwise
     */
    export async function userExists(userData: Partial<UserAttrs>) {
        const user = await User.findOne({ where: userData });

        return user !== null;
    }

    /**
     * Adds movie to user favorites
     * @param user User who wants to add the movie
     * @param movie Movie to be added
     */
    export async function addMovieToFavorites(user: User, movie: Movie) {
        await user.addMovie(movie);
    }

    /**
     * Removes movie from user favorites
     * @param user User who wants to remove the movie
     * @param movie Movie to be removed
     */
    export async function removeMovieFromFavorites(user: User, movie: Movie) {
        await user.removeMovie(movie);
    }
}

export default UsersService;
