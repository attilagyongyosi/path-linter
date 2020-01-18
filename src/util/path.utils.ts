import * as path from 'path';
import { isWindows } from './platform.utils';

const WINDOWS_PATH_SEPARATOR = /\\/;
const UNIX_PATH_SEPARATOR = /\//;

/**
 * Given a path-like string (e.g.: src/path/file.ext), this function
 * will convert the detected path-separator characters to the ones
 * supported by the execution environment platform.
 *
 * Supports Unix and Windows platforms.
 *
 * Implementation relies on NodeJS' 'os' module to determine
 * the current platform.
 *
 * Other characters should be left unchanged by this.
 *
 * @param   pathToConvert
 *          a path-like string to convert path separators in.
 *
 * @returns with a new string that has the path separators
 *          converted to that of the current platform.
 *          e.g.: unix/path/file.ext -> unix\\path\\file.ext
 *
 * @author  attilagyongyosi
 */
export function convertPathSeparators(pathToConvert: string): string {
    let pathSeparatorRegexp: RegExp = new RegExp(WINDOWS_PATH_SEPARATOR, 'g');

    if (isWindows()) {
        pathSeparatorRegexp = new RegExp(UNIX_PATH_SEPARATOR, 'g');
    }

    return pathToConvert.replace(pathSeparatorRegexp, path.sep);
}
