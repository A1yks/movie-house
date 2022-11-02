import path from 'path';
import dotenv from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';
dotenv.config({ path: path.resolve(`./.env.${dev ? 'development' : 'production'}`) });
