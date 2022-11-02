import { Console } from 'console';
import { createWriteStream } from 'fs';

function createLogger(path: string, errPath?: string) {
    const stdout = createWriteStream(path, { flags: 'a' });
    const stderr = errPath && createWriteStream(errPath, { flags: 'a' });

    return new Console(stdout, stderr || stdout);
}

export default createLogger;
