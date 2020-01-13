import { run } from '../../../test/utils/cli-runner';
import { ExitCodes } from '../../util/exit-codes';
import { RunOutput } from '../../../test/utils/cli-run-output';
import { CliSwitches } from '../options/cli-switches.enum';
import { ValidatorErrors } from '../../config/validator/config-validator-errors';

const TEST_CONFIG_BASE: string = 'test/configs';

// @todo change tests from using 'toContain()' to something more exact, preferably based on pre-defined messages.
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
        testRun(`${TEST_CONFIG_BASE}/kebab.config.json`, expected, done);
    })

    it('should lint kebab-correct folder with ignoring a full path', done => {
        const expected: RunOutput = {
            code: ExitCodes.OK,
            stdout: 'Linted 3 file(s)',
            stderr: ''
        };
        testRun(`${TEST_CONFIG_BASE}/kebab-ignore-full-path.config.json`, expected, done);
    });

    it('should fail with 1 linting error in should-fail folder', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stderr: 'does not match',
            stdout: 'Linted 3 file(s)'
        };
        testRun(`${TEST_CONFIG_BASE}/should-fail.config.json`, expected, done);
    });

    it('should fail with error when config doesn\'t contain rules', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_RULES
        };
        testRun(`${TEST_CONFIG_BASE}/no-rules.config.json`, expected, done);
    });

    it('should fail with error when config is missing a directory property', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_DIRECTORY
        };
        testRun(`${TEST_CONFIG_BASE}/no-directory.config.json`, expected, done);
    });

    it('should fail with error when config is missing rule property', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.NO_RULE
        };
        testRun(`${TEST_CONFIG_BASE}/no-rule.config.json`, expected, done);
    });

    it('should fail with error when config has invalid severity property', done => {
        const expected: RunOutput = {
            code: ExitCodes.ERROR,
            stdout: '',
            stderr: ValidatorErrors.WRONG_SEVERITY
        };
        testRun(`${TEST_CONFIG_BASE}/invalid-severity.config.json`, expected, done);
    });

    it('should not fail process when severity is warning', done => {
        const expected: RunOutput = {
            code: ExitCodes.OK,
            stdout: '',
            stderr: '[warning]'
        };
        testRun(`${TEST_CONFIG_BASE}/warning-severity.config.json`, expected, done);
    });
});
