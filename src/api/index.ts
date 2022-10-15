import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

dotenv.config({ path: path.resolve(`/.env.${dev ? 'development' : 'production'}`) });

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());

    app.all('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, () => {
        console.log('Server running on port ' + port);
    });
});
