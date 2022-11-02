import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

export const namespace = cls.createNamespace('ns');

Sequelize.useCLS(namespace);

const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +(process.env.DB_PORT as string) || 5432,
    timezone: '+00:00',
    define: {
        timestamps: false,
    },
});

export async function connectToDB() {
    await db.authenticate();
}

export default db;
