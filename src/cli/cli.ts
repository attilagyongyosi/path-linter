import { ConfigReader } from '../config/config-reader';
import { Config } from '../config/config';
import { FileSystemWalker } from '../file-system-walker/file-system-walker';
import { Linter } from '../linter/linter';
import { CliOptions } from './options/cli-options';
import { Logger } from '../logger/logger';
import { blue, green } from '../util/color-codes';
import { processCliOptions } from './options/cli-options-processor';

const LOG = new Logger();

let cliOptions: CliOptions = new CliOptions();
let configuration: Config = {};
let filesLinted: number = 0;

parseArguments();
readConfiguration();
execute();

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

        LOG.info(`Started linting ${blue(directory)}...`);
        new FileSystemWalker({
            onFinishCallback: () => {
                LOG.info(`Finished linting ${blue(directory)}!`);
                LOG.info(`Linted ${green(filesLinted + '')} files.`);
            },
            onFileCallback: (file) => {
                filesLinted++;
                if (!linter.lint(file)) {
                    LOG.error(`${blue(file)} does not match ${directoryRegex}!`);
                    process.exitCode = 1;
                }
            },
            onErrorCallback: (error) => {
                LOG.error(error.message);
                process.exit(1);
            }
        }).walk(directory);
    });
}
