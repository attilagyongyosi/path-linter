import * as fs from 'fs';
import * as path from 'path';

export default {

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
    fileExists: function (path: string): Promise<boolean> {
        return this.stats(path)
            .then(result => result.isFile())
            .catch(() => false);
    },

    /**
     * Given a directory and a set of file names,
     * this function will check if any of the files exist
     * in the folder and returns with the path of the first
     * one that matches.
     *
     * @param   directory
     *          The directory path as a string to search in.
     *
     * @param   fileNames
     *          An comma-separated set of file names
     *          to search for.
     *
     * @returns with the first file of the supplied list
     *          that can be found in the folder.
     *
     * @author  attilagyongyosi
     */
    findFile: function (directory: string, ...fileNames: string[]): Promise<string> {
        const filePaths = fileNames.map(fileName => path.join(directory, fileName));
        const existsPromises = filePaths.map(filePath => this.fileExists(filePath));

        return Promise.all(existsPromises).then(results => {
            return filePaths[results.indexOf(true)] || '';
        });
    },

    /**
     * Makes a Promise from NodeJS' stats() function.
     *
     * @param   path
     *          The path to get the file stats from.
     *
     * @returns with a Promise that resolves with a Stats object
     *          or rejects with an error if there is any.
     *
     * @author  attilagyongyosi
     */
    stats: function (path: string): Promise<fs.Stats> {
        return new Promise<fs.Stats>((resolve, reject) => {
            fs.stat(path, (error, result) => {
                if (error) { reject(error); }
                resolve(result);
            });
        });
    }
};
