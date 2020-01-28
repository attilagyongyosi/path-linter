import { CONVENTION_MAP } from '../supported-case-conventions.enum';

const KEBAB_CASE_REGEXP = CONVENTION_MAP['kebab-case'];

const test = (path: string): boolean => KEBAB_CASE_REGEXP.test(path);
const pass = (path: string): void => { expect(test(path)).toBe(true); };
const fail = (path: string): void => { expect(test(path)).toBe(false); };

describe('Built-in kebab-case regexp', () => {
    it('should match valid kebab-case paths', () => {
        pass('some-file.js');
        pass('/your-project-path/some-file.js');
        pass('/your-project-path/some-file12.js');
        pass('path\\with\\other\\separator-service.ts');
        pass('my/project/file.xhtml');
        pass('whatever.service.ts');
    });

    it('should match kebab-case paths with numbers', () => {
        pass('assets/logo-1920-1080px.jpeg');
        pass('folder/dir/numbers-0123456789.txt');
    });

    it('should fail on non-kebab-compliant paths', () => {
        fail('camelCase.ts');
        fail('snake_path/snake_file.jpg');
        fail('with/@special-chars.wav');
        fail('__tests__/wat.ts');
        fail('.gitignore');
        fail('uPpercase-Path.CSS');
    });
});
