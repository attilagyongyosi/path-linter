import { fork } from 'child_process';
import * as path from 'path';
import { RunOutput } from './cli-run-output';

export function run(args: string[]): Promise<RunOutput> {
    return new Promise((resolve) => {
        const cli = fork(path.join('lib', 'index'), args, { silent: true });

        let stdout = '';
        let stderr = '';

        cli.stdout.on('data', (data) => { stdout += data; });
        cli.stderr.on('data', (data) => { stderr += data; });
        cli.on('close', (code) => resolve({ code, stdout, stderr }));
    });
}
