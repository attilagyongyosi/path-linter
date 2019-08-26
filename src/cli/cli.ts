import { ConfigReader } from '../config/config-reader';
import { Config } from '../config/config';
import { FileVisitor } from '../file-visitor/file-visitor';
import { Linter } from '../linter/linter';
import { CliOptions } from './options/cli-options';
import { Logger } from '../logger/logger';
import { blue, cyan, green, red } from '../util/color-codes';
import { processCliOptions } from './options/cli-options-processor';

const LOG = new Logger();

let cliOptions: CliOptions = new CliOptions();
let configuration: Config = {};
let filesLinted: number = 0;

function parseArguments(): void {
    try {
        cliOptions = processCliOptions(process.argv.slice(2));
        LOG.options = cliOptions;
    } catch (cliOptionsError) {
        LOG.error(cliOptionsError.message);
        process.exit(1);
    }
}

function readConfiguration(): void {
    try {
        const configPathArg = cliOptions.configFile;
        configuration = ConfigReader.read(configPathArg);
    } catch(error) {
        LOG.error(`Failed to read configuration file! Reason: ${error.message}`);
        process.exit(1);
    }
}

function execute(): void {
    Object.keys(configuration).forEach((directory) => {
        const directoryRegex = configuration[directory];
        const linter = new Linter(directoryRegex);

        let failedPaths: number = 0;

        LOG.info(`Started linting ${blue(directory)}...`);
        new FileVisitor({
            onFinish: (): void => {
                LOG.info(`Finished linting ${blue(directory)}!`);
                if (!failedPaths) {
                    LOG.info(`Linted ${green(filesLinted + '')} file(s), no errors.`);
                } else {
                    LOG.info(`Linted ${green(filesLinted + '')} file(s), ${red('' + failedPaths)} didn't match pattern.`);
                }
            },
            onFile: (file): void => {
                filesLinted++;
                if (!linter.lint(file)) {
                    LOG.error(`${blue(file)} does not match ${cyan(directoryRegex.source)}!`);
                    process.exitCode = 1;
                    failedPaths++;
                }
            },
            onError: (error): void => {
                LOG.error(error.message);
                process.exit(1);
            },
            ignoreFiles: []
        }).walk(directory);
    });
}

parseArguments();
readConfiguration();
execute();
