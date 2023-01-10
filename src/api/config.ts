import path from 'path';
import dotenv from 'dotenv';

global.__DEV__ = process.env.NODE_ENV !== 'production';

dotenv.config({ path: path.resolve(`./.env.${__DEV__ ? 'development' : 'production'}`) });
