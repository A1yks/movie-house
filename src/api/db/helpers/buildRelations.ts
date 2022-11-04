import { Comment, Favorites, Genre, Movie, User, UserInfo } from '../models';
import RefreshToken from '../models/RefreshToken';

function buildRelations() {
    Movie.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
    });

    Movie.belongsToMany(User, { through: Favorites });

    Genre.belongsTo(Movie, {
        targetKey: 'id',
        foreignKey: 'movieId',
    });

    Comment.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
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
}

export default buildRelations;
