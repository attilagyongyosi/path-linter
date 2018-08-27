import { ConfigReader } from '../config/configReader';
import { Config } from '../config/config';
import { FileSystemWalker } from '../file-system-walker/file-system-walker';
import { Linter } from '../linter/linter';
import { CliOptions } from './cli-options';
import { Logger } from '../logger/logger';
import { blue, green } from '../util/color-codes';

const args = process.argv;

const options: CliOptions = {
    colorize: args.includes('--colorize')
};

const cliLogger = new Logger(options);

if (!args || !args.includes('--config')) {
    cliLogger.error('Missing configuration file!');
    process.exit(1);
}

let config: Config = {};
let filesLinted: number = 0;

try {
    const configPathArg = args[args.indexOf('--config') + 1];
    if (!configPathArg) {
        cliLogger.error('Missing configuration file!');
        process.exit(1);
    }
    config = ConfigReader.read(configPathArg);
} catch(error) {
    cliLogger.error(error.message);
    process.exit(1);
}

Object.keys(config).forEach((directory) => {
    const linter = new Linter(config[directory]);

    cliLogger.info(`Started linting ${blue(directory)}...`);
    new FileSystemWalker({
        onFinishCallback: () => {
            cliLogger.info(`Finished linting ${blue(directory)}!`);
            cliLogger.info(`Linted ${green(filesLinted + '')} files.`);
        },
        onFileCallback: (file) => {
            filesLinted++;
            if (!linter.lint(file)) {
                cliLogger.error(`Lint error in ${blue(file)}!`);
                process.exitCode = 1;
            }
        },
        onErrorCallback: (error) => {
            cliLogger.error(error.message);
            process.exit(1);
        }
    }).walk(directory);
});
