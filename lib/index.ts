import * as fs from 'fs';
import * as path from 'path';

import { Linter } from './linter';

const linter = new Linter();

let loggingEnabled = process.argv[3] === '--verbose';
let numberOfFiles = 0;

function walk(directory: string): void {
    fs.readdir(directory, (error, files) => {
        if (error) { process.exit(1); }

        numberOfFiles += files.length;

        files.forEach((file) => {
            log(`Processing ${file}...`);
            fs.stat(path.join(directory, file), (error, stats) => {
                if (error) { log(error.message); process.exit(2); }
                log(`Is file? ${stats.isFile()}`);
                if (stats.isDirectory()) {
                    walk(file);
                } else if (stats.isFile()) {
                    log(`Linting ${file}...`);
                    if (!linter.lint(file)) {
                        console.error(`${file} does not comply with path pattern!`);
                        process.exit(3);
                    }

                    numberOfFiles--;
                    if (numberOfFiles === 0) {
                        console.log('All files linted OK.');
                        process.exit(0);
                    }
                }
            });
        });
    });
}

function log(message: string): void {
    if (loggingEnabled) {
        console.log(message);
    }
}

walk(process.argv[2]);
