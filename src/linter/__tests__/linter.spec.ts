import * as path from 'path';
import { Linter } from '../linter';

describe('Linter', () => {
    it('should lint a file name with a given regular expression', () => {
        const linter = new Linter(/.*/);
        expect(linter.lint('my/path/source.js')).toBe(true);
    });

    it('should lint each part of the path separately', () => {
        const expectedCallTime: number = 3;
        const linter = new Linter(/.*/);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spy = spyOn(linter as any, 'lintPart').and.callThrough();

        linter.lint(path.join('my', 'path', 'file.ts'));

        expect(spy).toBeCalledTimes(expectedCallTime);
    })
});
