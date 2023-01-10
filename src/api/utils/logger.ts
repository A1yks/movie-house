import path from 'path';
import createLogger from './createLogger';

const dev = process.env.NODE_ENV !== 'production';
const logger = dev ? console : createLogger(path.resolve('./logs/logs.log'), path.resolve('./logs/errors.log'));

export default logger;
