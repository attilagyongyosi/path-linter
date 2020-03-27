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
import { resolveRegexp } from '../config/regexp-resolver';
import { convertPathSeparators } from '../util/path.utils';

const LOG = new Logger();

const CLI_OPTIONS_INDEX: number = 2;
const MILLISECONDS: number = 1000;

let cliOptions: CliOptions = new CliOptions();
let configuration: Config = { colorize: false, rules: [] };
let filesLinted: number = 0;

async function readConfiguration(): Promise<void> {
    try {
        cliOptions = processCliOptions(process.argv.slice(CLI_OPTIONS_INDEX));
        const configPathArg = cliOptions.configFile;
        configuration = await ConfigReader.read(configPathArg);
        LOG.colorize = configuration.colorize || cliOptions.colorize || false;
    } catch(error) {
        LOG.error(`Failed to read configuration file! Reason: ${error.message}`);
        process.exit(ExitCodes.ERROR);
    }
}

function execute(): void {
    const startTime = Date.now();
    const severity = configuration.severity || SeverityLevels.ERROR;

    configuration.rules.forEach(rule => {
        const regExp = resolveRegexp(rule);
        const linter = new Linter(regExp);

        let failedPaths: number = 0;

        LOG.info(`Started linting ${Colorizer.blue(rule.directory)}...`);
        new FileVisitor({
            onFinish: (): void => {
                LOG.info(`Finished linting ${Colorizer.blue(rule.directory)}!`);
                if (!failedPaths) {
                    LOG.info(`Linted ${Colorizer.green(filesLinted)} file(s), no errors.`);
                } else {
                    const lintedMessage = Colorizer.green(filesLinted);
                    const errors = Colorizer.red(failedPaths);
                    LOG.info(`Linted ${lintedMessage} file(s), ${errors} didn't match pattern.`);
                }
                LOG.info(`Linting time: ${Colorizer.blue((Date.now() - startTime) / MILLISECONDS)}s`);
            },
            onFile: (file): void => {
                const normalizedIgnores = rule.ignore?.map(convertPathSeparators);
                const strippedPath = strip(file, ...normalizedIgnores || []);

                if (!strippedPath) { return; }

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

readConfiguration().then(execute);
