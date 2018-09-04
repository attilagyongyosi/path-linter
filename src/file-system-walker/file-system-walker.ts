import * as path from 'path';
import * as fs from 'fs';
import { FileSystemWalkerConfig } from './file-system-walker-config';

/**
 * Instances of this class can be used to walk
 * through a directory recursively and visit every file.
 *
 * @author  attilagyongyosi
 * @todo    optional gitkeep filtering only for unit tests
 */
export class FileSystemWalker {

    /**
     * Inner counter to keep track if we've visited
     * every file in the given folder recursively.
     */
    private numberOfFiles: number = 0;

    constructor(private config: FileSystemWalkerConfig) {}

    /**
     * Returns with the current configuration object
     * for this instance.
     *
     * Primarily for unit testing purposes.
     */
    get walkerConfig(): FileSystemWalkerConfig {
        return this.config;
    }

    public walk(root: string): void {
        return this.walkDirectory(root);
    }

    private walkDirectory(parentPath: string): void {
        const currentPath = path.join(parentPath);

        fs.readdir(currentPath, (error, files = []) => {
            if (error) { return this.config.onErrorCallback(error); }

            if (this.numberOfFiles) { --this.numberOfFiles; }

            files = files.filter(file => file !== '.gitkeep');
            this.numberOfFiles += files.length;

            if (this.numberOfFiles === 0) {
                return this.config.onFinishCallback();
            }

            files.forEach(file => {
                this.stat(path.join(currentPath, file));
            });
        });
    }

    private stat(path: string): void {
        fs.stat(path, (error, stats) => {
            if (error) { return this.config.onErrorCallback(error); }

            if (stats.isDirectory()) {
                return this.walk(path);
            }

            this.config.onFileCallback(path);
            --this.numberOfFiles;

            if (this.numberOfFiles === 0) {
                return this.config.onFinishCallback();
            }
        });
    }
}
