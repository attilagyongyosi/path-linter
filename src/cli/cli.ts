import { ConfigReader } from '../config/reader/config-reader';
import { Config } from '../config/config';
import { FileVisitor } from '../file-visitor/file-visitor';
import { Linter } from '../linter/linter';
import { CliOptions } from './options/cli-options';
import { Logger } from '../logger/logger';
import { processCliOptions } from './options/cli-options-processor';
import { ExitCodes } from '../util/exit-codes';
import { SeverityLevels } from '../config/severity-levels';
import { Colorizer } from '../colorizer/colorizer';
import { strip } from '../util/string.utils';

const LOG = new Logger();

const CLI_OPTIONS_INDEX: number = 2;
const MILLISECONDS: number = 1000;

let cliOptions: CliOptions = new CliOptions();
let configuration: Config = { rules: [] };
let filesLinted: number = 0;

function parseArguments(): void {
    try {
        cliOptions = processCliOptions(process.argv.slice(CLI_OPTIONS_INDEX));
        LOG.colorize = cliOptions.colorize || false;
    } catch (cliOptionsError) {
        LOG.error(cliOptionsError.message);
        process.exit(ExitCodes.ERROR);
    }
}

function readConfiguration(): void {
    try {
        const configPathArg = cliOptions.configFile;
        configuration = ConfigReader.read(configPathArg);
    } catch(error) {
        LOG.error(`Failed to read configuration file! Reason: ${error.message}`);
        process.exit(ExitCodes.ERROR);
    }
}

/**
 * @todo    at this point resolveRegexp() should have been called for logging purposes.
 */
function execute(): void {
    const startTime = Date.now();
    const severity = configuration.severity || SeverityLevels.ERROR;

    configuration.rules.forEach(rule => {
        const linter = new Linter(rule);

        let failedPaths: number = 0;

        LOG.info(`Started linting ${Colorizer.blue(rule.directory)}...`);
        new FileVisitor({
            onFinish: (): void => {
                LOG.info(`Finished linting ${Colorizer.blue(rule.directory)}!`);
                if (!failedPaths) {
                    LOG.info(`Linted ${Colorizer.green(filesLinted + '')} file(s), no errors.`);
                } else {
                    const lintedMessage = Colorizer.green(filesLinted + '');
                    const errors = Colorizer.red('' + failedPaths);
                    LOG.info(`Linted ${lintedMessage} file(s), ${errors} didn't match pattern.`);
                }
                LOG.info(`Linting time: ${(Date.now() - startTime) / MILLISECONDS}s`);
            },
            onFile: (file): void => {
                const strippedPath = strip(file, ...rule.ignore || []);

                filesLinted++;
                if (!linter.lint(strippedPath)) {
                    if (severity === SeverityLevels.ERROR) {
                        LOG.error(`${Colorizer.blue(file)} does not match ${Colorizer.cyan(rule.rule)}!`);
                        process.exitCode = ExitCodes.ERROR;
                    } else {
                        LOG.warning(`${Colorizer.blue(file)} does not match ${Colorizer.cyan(rule.rule)}!`);
                    }
                    failedPaths++;
                }
            },
            onError: (error): void => {
                LOG.error(error.message);
                process.exit(ExitCodes.ERROR);
            },
            ignoreFiles: []
        }).walk(rule.directory);
    });
}

parseArguments();
readConfiguration();
execute();
