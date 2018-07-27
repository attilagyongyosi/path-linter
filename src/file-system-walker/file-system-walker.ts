import * as path from 'path';
import * as fs from 'fs';
import { FileSystemWalkerConfig } from './file-system-walker-config';

export class FileSystemWalker {
    private numberOfFiles: number = 0;

    constructor(private config: FileSystemWalkerConfig) {}

    get walkerConfig(): FileSystemWalkerConfig {
        return this.config;
    }

    public walk(root: string): void {
        return this.walkDirectory(root);
    }

    private walkDirectory(parentPath: string, directory: string = ''): void {
        const currentPath = path.join(parentPath, directory);

        fs.readdir(currentPath, (error, files = []) => {
            if (error) { this.config.onErrorCallback(error); }

            if (this.numberOfFiles) { --this.numberOfFiles; }

            this.numberOfFiles += files ? files.length : 0;

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
            if (error) { this.config.onErrorCallback(error); }

            if (stats.isDirectory()) {
                return this.walk(path);
            }

            if (stats.isFile()) {
                this.config.onFileCallback(path);
                --this.numberOfFiles;
            }

            if (this.numberOfFiles === 0) {
                return this.config.onFinishCallback();
            }
        });
    }
}
