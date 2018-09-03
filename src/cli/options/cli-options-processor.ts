import { CliOptions } from './cli-options';
import { CliSwitches } from './cli-switches.enum';

/**
 * Error messages for the CLI Options Processor function.
 */
export const CLI_OPTIONS_MESSAGES = {
    noArgs: `Invalid command arguments! At least ${CliSwitches.CONFIG} is required!`,
    noConfig: `No ${CliSwitches.CONFIG} option supplied!`,
    invalidConfig: `Invalid configuration file path. Forgot to specify after ${CliSwitches.CONFIG}?`
};

/**
 * Transforms the command line arguments of path-linter
 * and serializes them into a custom configuration object.
 *
 * @param   cliArgs
 *          A string array to process. During natural runtime
 *          this will be NodeJS' command line arguments.
 *
 * @returns an instance of {@link CliOptions} which contain
 *          a mapped version of the supplied arguments.
 *
 * @throws  an error when the transformation can not be done.
 *          Examples include empty arguments (a configuration
 *          file must be supplied) or invalid order of arguments.
 *
 * @see     CliOptions
 * @see     CliSwitches
 *
 * @todo    config option should have a fallback default value
 */
export function processCliOptions(cliArgs: string[]): CliOptions {
    if (!cliArgs || !cliArgs.length) {
        throw Error(CLI_OPTIONS_MESSAGES.noArgs);
    }

    const configOptionIndex = cliArgs.indexOf(CliSwitches.CONFIG);

    if (configOptionIndex === -1) {
        throw new Error(CLI_OPTIONS_MESSAGES.noConfig);
    }

    let configFile: string = cliArgs[configOptionIndex + 1];
    if (!configFile || configFile.startsWith('--')) {
        throw new Error(CLI_OPTIONS_MESSAGES.invalidConfig);
    }

    return {
        colorize: cliArgs.includes(CliSwitches.COLORIZE),
        configFile: configFile
    };
}
