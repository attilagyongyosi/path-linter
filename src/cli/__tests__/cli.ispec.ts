import { run } from '../../../test/utils/cli-runner';

describe('CLI', () => {
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
            expect(output.stdout).toContain('Linted 4 file(s)');
            done();
        });
    });

    it('should fail with 1 linting error in should-fail folder', (done) => {
        run([ '--config', 'test/should-fail-config.json' ]).then(output => {
            expect(output.code).toBe(1);
            expect(output.stdout).toContain('Linted 3 file(s)');
            expect(output.stderr).toContain('does not match');
            done();
        });
    });
});
