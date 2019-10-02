import { run } from '../../../test/utils/cli-runner';

describe('CLI', () => {
    it('should halt when configuration file can not be read', async done => {
        const result = await run([ '--config', 'non-existing.json' ]);
        expect(result.code).toBe(1);
        expect(result.stderr).toContain('Failed to read configuration');
        expect(result.stdout).toBe('');
        done();
    });

    it('should lint kebab-correct folder', async done => {
        const result = await run([ '--config', 'test/kebab-config.json' ]);
        expect(result.code).toBe(0);
        expect(result.stderr).toBe('');
        expect(result.stdout).toContain('Linted 4 file(s)');
        done();
    });

    it('should fail with 1 linting error in should-fail folder', async done => {
        const result = await run([ '--config', 'test/should-fail-config.json' ]);
        expect(result.code).toBe(1);
        expect(result.stdout).toContain('Linted 3 file(s)');
        expect(result.stderr).toContain('does not match');
        done();
    });
});
