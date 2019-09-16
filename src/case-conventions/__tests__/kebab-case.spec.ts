import { CONVENTION_MAP } from '../supported-case-conventions.enum';

const KEBAB_CASE_REGEXP = CONVENTION_MAP['kebab-case'];

function pass(path: string): void {
    expect(KEBAB_CASE_REGEXP.test(path)).toBe(true);
}

function fail(path: string): void {
    expect(KEBAB_CASE_REGEXP.test(path)).toBe(false);
}

describe('Built-in kebab-case regexp', () => {
    it('should match valid kebab-case paths', () => {
        pass('some-file.js');
        pass('/your-project-path/some-file.js');
        pass('/your-project-path/some-file12.js');
    });

    it('should fail on non-kebab-compliant paths', () => {
        fail('camelCase.ts');
        fail('snake_path/snake_file.jpg');
        fail('with/@special-chars.wav');
    });
});
