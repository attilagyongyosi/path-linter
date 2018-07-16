import { Linter } from '../linter';

describe('Linter', () => {
    let linter: Linter;

    beforeEach(() => {
        linter = new Linter();
    });

    it('should lint path as strings based on a regular expression', () => {
        expect(linter.lint('some-file.ts')).toBe(true);
    });
});
