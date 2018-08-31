import { processCliOptions } from '../cli-options-processor';
import { CliOptions } from '../cli-options';

describe('CLI Options Processor', () => {
    it('should fail when configuration argument is missing', () => {
        let args: string[] = [
            'test/server.js',
            '--colorize',
            '--some-other-arg',
            'whatever'
        ];

        try {
            processCliOptions(args);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toContain('--config');
        }
    });

    it('should fail when no configuration file path is given', () => {
        let args: string[] = [
            'test/index.js',
            '--config'
        ];

        try {
            processCliOptions(args);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should fail when configuration path argument is another option', () => {
        let args: string[] = [
            'lib.js',
            '--config',
            '--colorize'
        ];

        try {
            processCliOptions(args);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create CliOptions object', () => {
        let args: string[] = [
            'file.js',
            '--colorize',
            '--config',
            'config.json'
        ];

        let processed: CliOptions = processCliOptions(args);
        expect(processed).toEqual({
            colorize: true,
            configFile: 'config.json'
        });
    });
});
