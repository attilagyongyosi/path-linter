import { ConfigReader } from './config/configReader';
import { Config } from './config/config';
import { FileSystemWalker } from './file-system-walker/file-system-walker';
import { Linter } from './linter/linter';

const args = process.argv;

if (!args || args.length < 3) {
    console.error('No configuration file given!');
    process.exit(1);
}

let config: Config = {};

try {
    config = ConfigReader.read(args[2]);
} catch(error) {
    console.error(error.message);
    process.exit(1);
}

Object.keys(config).forEach((directory) => {
    const linter = new Linter(config[directory]);

    new FileSystemWalker({
        onFinishCallback: () => console.log(`Linting finished in ${directory}.`),
        onFileCallback: (file) => {
            if (!linter.lint(file)) {
                console.error(`Failed to lint ${file}!`);
                process.exitCode = 1;
            }
        },
        onErrorCallback: () => console.error
    }).walk(directory);
});
