import { FileVisitorConfig } from './file-visitor-config';
import { FileVisitor } from './file-visitor';

export class FileVisitorBuilder {
    private readonly config: Partial<FileVisitorConfig>;

    constructor() {
        this.config = {
            ignoreFiles: []
        };
    }

    public onFile(onFileHandler: (file: string) => void): FileVisitorBuilder {
        this.config.onFile = onFileHandler;
        return this;
    }

    public onError(onErrorHandler: (error: Error) => void): FileVisitorBuilder {
        this.config.onError = onErrorHandler;
        return this;
    }

    public onFinish(onFinishHandler: () => void): FileVisitorBuilder {
        this.config.onFinish = onFinishHandler;
        return this;
    }

    public ignoredFiles(ignoredFiles: string[] = []): FileVisitorBuilder {
        this.config.ignoreFiles = ignoredFiles;
        return this;
    }

    public build(): FileVisitor {
        return new FileVisitor(this.config as FileVisitorConfig);
    }

}
