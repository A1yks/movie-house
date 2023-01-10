import { Comment, Favorites, Genre, Movie, User, UserInfo } from '../models';
import Rating from '../models/Rating';
import RefreshToken from '../models/RefreshToken';

function buildRelations() {
    Movie.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
    });

    Movie.belongsToMany(User, { through: Favorites, targetKey: 'id', foreignKey: 'userId' });

    Movie.hasMany(Genre, {
        sourceKey: 'id',
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
    });

    Movie.hasOne(Movie, {
        foreignKey: 'id',
        as: 'selfJoin',
    });

    Genre.belongsTo(Movie, {
        targetKey: 'id',
        foreignKey: 'movieId',
    });

    Comment.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    Comment.belongsTo(Comment, {
        targetKey: 'id',
        foreignKey: 'replyId',
        as: 'parent',
    });

    Comment.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'replyId',
        as: 'replies',
    });

    User.hasOne(UserInfo, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });

    User.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });

    User.belongsToMany(Movie, {
        through: Favorites,
        onDelete: 'CASCADE',
        targetKey: 'id',
        foreignKey: 'movieId',
    });

    User.hasOne(RefreshToken, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });

    RefreshToken.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    User.hasMany(Rating, {
        sourceKey: 'id',
        foreignKey: 'userId',
    });

    Movie.hasMany(Rating, {
        sourceKey: 'id',
        foreignKey: 'movieId',
        as: 'ratings',
        onDelete: 'CASCADE',
    });

    Rating.belongsTo(Movie, {
        targetKey: 'id',
        foreignKey: 'movieId',
    });
}

export default buildRelations;
