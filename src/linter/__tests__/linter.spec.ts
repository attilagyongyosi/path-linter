import { Linter } from '../linter';

describe('Linter', () => {
    it('should lint a file path with a given regular expression', () => {
        const linter = new Linter({ directory: '', rule: '.*' });
        expect(linter.lint('my/path/source.js')).toBe(true);
    });

    it('should return false on falsy file path', () => {
        const linter = new Linter({ directory: '', rule: '.*' });
        expect(linter.lint(undefined)).toBe(false);
    });
});
