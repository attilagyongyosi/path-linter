import { CLI_OPTIONS_MESSAGES, processCliOptions } from '../cli-options-processor';
import { CliOptions } from '../cli-options';

describe('CLI Options Processor', () => {
    it('should not fail when --config switch is not specified', () => {
        const args: string[] = [
            'test/server.js',
            '--colorize',
            '--some-other-arg',
            'whatever'
        ];

        const options: CliOptions = processCliOptions(args);
        expect(options.configFile).toBeFalsy();
    });

    it('should fail when --config switch is specified but no configuration file path is given', () => {
        const args: string[] = [
            'test/index.js',
            '--config'
        ];

        expect(() => processCliOptions(args)).toThrowError(CLI_OPTIONS_MESSAGES.invalidConfig);
    });

    it('should fail when --config switch is specified but is followed by another switch', () => {
        const args: string[] = [
            'test/index.js',
            '--config',
            '--colorize'
        ];

        expect(() => processCliOptions(args)).toThrowError(CLI_OPTIONS_MESSAGES.invalidConfig);
    });

    it('should create CliOptions object', () => {
        const args: string[] = [
            'file.js',
            '--colorize',
            '--config',
            'config.json'
        ];

        const processed: CliOptions = processCliOptions(args);
        expect(processed).toEqual({
            colorize: true,
            configFile: 'config.json'
        });
    });
});
