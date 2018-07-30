import { fork } from 'child_process';
import * as path from 'path';

const run = (args: string[], callback: Function) => {
    const cli = fork(path.join('lib', 'lib'), args, { silent: true });

    let stdoutBuffer = '';
    cli.stdout.on('data', (data) => {
        stdoutBuffer += data;
    });

    let stderrBuffer = '';
    cli.stderr.on('data', (data) => {
        stderrBuffer += data;
    });

    cli.on('close', (code) => {
        callback(code, stdoutBuffer, stderrBuffer);
    });
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
});
