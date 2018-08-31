import { CliOptions } from './cli-options';

export function processCliOptions(cliArgs: string[]): CliOptions {
    if (!cliArgs) {
        throw Error('Invalid command arguments!');
    }

    const configOptionIndex = cliArgs.indexOf('--config');

    if (configOptionIndex === -1) {
        throw new Error('No --config option supplied!');
    }

    let configFile: string = cliArgs[configOptionIndex + 1];
    if (!configFile || configFile.startsWith('--')) {
        throw new Error('Invalid configuration file path. Forgot to specify after --config?');
    }

    return {
        colorize: cliArgs.includes('--colorize'),
        configFile: configFile
    };
}
