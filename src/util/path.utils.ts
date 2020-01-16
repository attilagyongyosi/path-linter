import * as path from 'path';
import { isWindows } from './platform.utils';

const WINDOWS_PATH_SEPARATOR = '\\\\';
const UNIX_PATH_SEPARATOR = '/';

export function convertPathSeparators(pathToConvert: string): string {
    let pathSeparatorRegexp: RegExp = new RegExp(WINDOWS_PATH_SEPARATOR, 'g');

    if (isWindows()) {
        pathSeparatorRegexp = new RegExp(UNIX_PATH_SEPARATOR, 'g');
    }

    return pathToConvert.replace(pathSeparatorRegexp, path.sep);
}
