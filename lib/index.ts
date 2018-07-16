import { Linter } from './linter/linter';
import { FsTreeWalker } from './fs-tree-walker';

const linter = new Linter();
const walker = new FsTreeWalker({
    onFileCallback: (file: string) => {
        if (!linter.lint(file)) {
            console.error(`Path ${file} does not comply to regex!`);
            process.exit(2);
        }
    },
    onErrorCallback: (error: Error) => {
        console.error('An unexpected error occured!', error.message);
        throw error;
    },
    onFinishCallback: () => {
        console.log('All files pass.');
        process.exit(0);
    }
});

walker.walk(process.argv[2] || __dirname);
