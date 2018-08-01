import { fork } from 'child_process';
import * as path from 'path';

const run = (args: string[], callback: Function) => {
    const cli = fork(path.join('lib', 'main'), args, { silent: true });

    let stdoutBuffer = '';
    let stderrBuffer = '';

    cli.stdout.on('data', (data) => { stdoutBuffer += data; });
    cli.stderr.on('data', (data) => { stderrBuffer += data; });
    cli.on('close', (code) => { callback(code, stdoutBuffer, stderrBuffer); });
};

describe('CLI', () => {
    it('should show error when no configuration file was given', (done) => {
        run([], (code: number, stdout: string, stderr: string) => {
            expect(code).toBe(1);
            expect(stderr).toContain('No configuration file given!');
            expect(stdout).toBe('');
            done();
        });
    });

    it('should halt when configuration file can not be read', (done) => {
        run([ 'non-existing.json' ], (code: number, stdout: string, stderr: string) => {
            expect(code).toBe(1);
            expect(stderr).not.toBeFalsy();
            expect(stdout).toBe('');
            done();
        });
    });

    it('should lint kebab-correct folder', (done) => {
        run([ 'test/kebab-config.json' ], (code: number, stdout: string, stderr: string) => {
            expect(code).toBe(0);
            expect(stderr).toBe('');
            expect(stdout).toContain('Linted 4 files.');
            done();
        });
    });

    it('should fail with 1 linting error in should-fail folder', (done) => {
        run([ 'test/should-fail-config.json' ], (code: number, stdout: string, stderr: string) => {
            expect(code).toBe(1);
            expect(stdout).toContain('Linted 3 files.');
            expect(stderr).toContain('Failed to lint');
            done();
        });
    });
});
