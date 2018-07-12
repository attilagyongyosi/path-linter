import * as fs from 'fs';
import { Linter } from './linter';

const linter = new Linter();

function walk(path: string): void {
    fs.readdir(path, (error, files) => {
        if (error) { process.exit(1); }

        files.forEach((file) => {
            fs.lstat(file, (error, stats) => {
                if (error) { process.exit(2); }
                if (stats.isDirectory()) {
                    walk(file);
                } else if (stats.isFile()) {
                    if (!linter.lint(file)) {
                        console.error(`${file} does not comply with path pattern!`);
                        process.exit(3);
                    }
                }
            });
        });
    });
}

walk(__dirname);
