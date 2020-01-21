import * as fs from 'fs';

/**
 * Checks whether the given path string is an
 * existing file in the file system.
 *
 * @param   path
 *          A string representing a path to check.
 *
 * @returns with a Promise that resolves to `true` when
 *          the is a valid file or `false` if it doesn't
 *          exist or is a directory.
 *
 * @author  attilagyongyosi
 */
export async function fileExists(path: string): Promise<boolean> {
    return stats(path)
        .then(result => result.isFile())
        .catch(() => false);
}

export async function stats(path: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (error, result) => {
            if (error) { reject(error); }
            resolve(result);
        });
    });
}
