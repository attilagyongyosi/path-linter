import * as path from 'path';
import * as fs from 'fs';
import { FsTreeWalkerConfig } from './fs-tree-walker-config';

export class FsTreeWalker {
    private numberOfFiles: number = 0;

    constructor(private config: FsTreeWalkerConfig) {}

    public walk(directory: string): void {
        fs.readdir(directory, (error, files) => {
            if (error) { this.config.onErrorCallback(error); }

            this.numberOfFiles += files.length;

            files.forEach((file) => {
                fs.stat(path.join(directory, file), (error, stats) => {
                    if (error) { this.config.onErrorCallback(); }

                    if (stats.isDirectory()) {
                        this.walk(file);
                    } else if (stats.isFile()) {
                        this.config.onFileCallback(file);

                        this.numberOfFiles--;
                        if (this.numberOfFiles === 0) {
                            this.config.onFinishCallback();
                        }
                    }
                });
            });
        });
    }
}
