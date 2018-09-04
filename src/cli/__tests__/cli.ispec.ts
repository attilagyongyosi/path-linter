import { fork } from 'child_process';
import * as path from 'path';
import { CLI_OPTIONS_MESSAGES } from '../options/cli-options-processor';

interface RunOutput {
    code: number;
    stdout: string;
    stderr: string;
}

function run(args: string[]): Promise<RunOutput> {
    return new Promise((resolve) => {
        const cli = fork(path.join('lib', 'main'), args, { silent: true });

        let stdout = '';
        let stderr = '';

        cli.stdout.on('data', (data) => { stdout += data; });
        cli.stderr.on('data', (data) => { stderr += data; });
        cli.on('close', (code) => resolve({ code, stdout, stderr }));
    });
}

describe('CLI', () => {
    it('should show error when no configuration file was given', (done) => {
        run([]).then(output => {
            expect(output.code).toBe(1);
            expect(output.stderr).toContain(CLI_OPTIONS_MESSAGES.noArgs);
            expect(output.stdout).toBe('');
            done();
        });
    });

    it('should halt when configuration file can not be read', (done) => {
        run([ '--config', 'non-existing.json' ]).then(output => {
            expect(output.code).toBe(1);
            expect(output.stderr).toContain('Failed to read configuration');
            expect(output.stdout).toBe('');
            done();
        });
    });

    it('should lint kebab-correct folder', (done) => {
        run([ '--config', 'test/kebab-config.json' ]).then(output => {
            expect(output.code).toBe(0);
            expect(output.stderr).toBe('');
            expect(output.stdout).toContain('Linted 4 files.');
            done();
        });
    });

    it('should fail with 1 linting error in should-fail folder', (done) => {
        run([ '--config', 'test/should-fail-config.json' ]).then(output => {
            expect(output.code).toBe(1);
            expect(output.stdout).toContain('Linted 3 files.');
            expect(output.stderr).toContain('does not match');
            done();
        });
    });
});
