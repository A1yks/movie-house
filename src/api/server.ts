import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import db, { connectToDB } from './db/database';
import buildRelations from './db/helpers/buildRelations';
import authRouter from './routes/auth';
import tokensRouter from './routes/tokens';
import moviesRouter from './routes/movies';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectToDB();
        console.log('Connected to db');

        buildRelations();

        await db.sync({ logging: false, alter: true });
        console.log('All models were synchronized successfully');

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();

            app.use(express.json());
            app.use(cookieParser());

            app.use('/api/auth', authRouter);
            app.use('/api/tokens', tokensRouter);
            app.use('/api/movies', moviesRouter);

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            app.listen(port, () => {
                console.log('Server running on port ' + port);
            });
        });
    } catch (err) {
        console.error(err);
    }
})();
