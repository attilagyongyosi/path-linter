import { Linter } from '../linter';

describe('Linter', () => {
    it('should lint a file name with a given regular expression', () => {
        const linter = new Linter(/.*\.js/);
        expect(linter.lint('my/path/source.js')).toBe(true);
    });
});
