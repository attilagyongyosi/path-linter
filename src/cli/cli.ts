import { ConfigReader } from '../config/configReader';
import { Config } from '../config/config';
import { FileSystemWalker } from '../file-system-walker/file-system-walker';
import { Linter } from '../linter/linter';
import { MESSAGES } from '../messages';
import { CliOptions } from './cli-options';
import { Logger } from '../logger/logger';
import { COLORS } from '../util/color-codes';

const args = process.argv;

const options: CliOptions = {
    colorize: args.includes('--colorize'),
    reports: args.includes('--reporting')
};

const cliLogger = new Logger(options);

if (!args || !args.includes('--config')) {
    cliLogger.error(MESSAGES.missingConfig);
    process.exit(1);
}

let config: Config = {};
let filesLinted: number = 0;

try {
    const configPathArg = args[args.indexOf('--config') + 1];
    if (!configPathArg) {
        cliLogger.error(MESSAGES.missingConfig);
        process.exit(1);
    }
    config = ConfigReader.read(configPathArg);
} catch(error) {
    cliLogger.error(error.message);
    process.exit(1);
}

Object.keys(config).forEach((directory) => {
    const linter = new Linter(config[directory]);

    new FileSystemWalker({
        onFinishCallback: () => {
            cliLogger.info(`${MESSAGES.lintingFinished} ${COLORS.BLUE}${directory}${COLORS.RESET}!`);
            cliLogger.info(`Linted ${COLORS.GREEN}${filesLinted}${COLORS.RESET} files.`);
        },
        onFileCallback: (file) => {
            filesLinted++;
            if (!linter.lint(file)) {
                cliLogger.error(`${MESSAGES.failedToLint} ${COLORS.BLUE}${file}${COLORS.RESET}!`);
                process.exitCode = 1;
            }
        },
        onErrorCallback: (error) => {
            cliLogger.error(error.message);
            process.exit(1);
        }
    }).walk(directory);
});
