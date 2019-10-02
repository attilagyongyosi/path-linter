import { run } from '../../../test/utils/cli-runner';
import { ExitCodes } from '../../util/exit-codes';
import { RunOutput } from '../../../test/utils/cli-run-output';
import { CliSwitches } from '../options/cli-switches.enum';
import { ValidatorErrors } from '../../config/validator/config-validator-errors';

async function testRun(configFile: string, expectedResult: RunOutput, done: Function): Promise<void> {
    const result = await run([ CliSwitches.CONFIG, configFile ]);
    expect(result.code).toBe(expectedResult.code);
    expect(result.stdout).toContain(expectedResult.stdout);
    expect(result.stderr).toContain(expectedResult.stderr);
    done();
}

describe('CLI End-to-End', () => {
    it('should halt when configuration file can not be read', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stderr: 'Failed to read configuration',
            stdout: ''
        };
        testRun('non-existing.json', expected, done);
    });

    it('should lint kebab-correct folder', done => {
        const expected: RunOutput = {
            code: ExitCodes.OK,
            stderr: '',
            stdout: 'Linted 4 file(s)'
        };
        testRun('test/kebab-config.json', expected, done);
    });

    it('should fail with 1 linting error in should-fail folder', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stderr: 'does not match',
            stdout: 'Linted 3 file(s)'
        };
        testRun('test/should-fail-config.json', expected, done);
    });

    it('should fail with error when config doesn\'t contain rules', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_RULES
        };
        testRun('test/no-rules-config.json', expected, done);
    });

    it('should fail with error when config is missing a directory property', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_DIRECTORY
        };
        testRun('test/no-directory-config.json', expected, done);
    });

    it('should fail with error when config is missing rule property', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_RULE
        };
        testRun('test/no-rule-config.json', expected, done);
    });
});
