import * as path from 'path';
import * as fs from 'fs';
import { FileVisitorConfig } from './file-visitor-config';

/**
 * Instances of this class can be used to walk
 * through a directory recursively and visit every file.
 *
 * @author  attilagyongyosi
 * @see     FileVisitorConfig
 */
export class FileVisitor {

    /**
     * Inner counter to keep track if we've visited
     * every file in the given folder recursively.
     */
    private numberOfFiles: number = 0;

    constructor(private config: FileVisitorConfig) {}

    /**
     * Returns with the current configuration object
     * for this instance.
     *
     * Primarily for unit testing purposes.
     */
    get visitorConfig(): FileVisitorConfig {
        return this.config;
    }

    public walk(root: string): void {
        return this.walkDirectory(root);
    }

    private walkDirectory(parentPath: string): void {
        const currentPath = path.join(parentPath);

        fs.readdir(currentPath, (error, files = []) => {
            if (error) { return this.config.onError(error); }

            if (this.numberOfFiles) { --this.numberOfFiles; }

            files = files.filter(file => !this.config.ignoreFiles.includes(file));

            this.numberOfFiles += files.length;
            if (this.numberOfFiles === 0) {
                return this.config.onFinish();
            }

            files.forEach(file => {
                this.visit(path.join(currentPath, file));
            });
        });
    }

    private visit(path: string): void {
        fs.stat(path, (error, stats) => {
            if (error) { return this.config.onError(error); }

            if (stats.isDirectory()) {
                return this.walk(path);
            }

            this.config.onFile(path);
            --this.numberOfFiles;

            if (this.numberOfFiles === 0) {
                return this.config.onFinish();
            }
        });
    }
}
