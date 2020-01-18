import { escape } from '../regexp.utils';

describe('RegExp Utils', () => {
    describe('escape()', () => {
        it('should escape special characters', () => {
            expect(escape('.wat')).toBe('\\.wat');
            expect(escape('path/like/')).toBe('path\\/like\\/');
            expect(escape('wa&t')).toBe('wa\\&t');
        });

        it('should leave string without special chars unchanged', () => {
            expect(escape('')).toBe('');
            expect(escape('wat')).toBe('wat');
        });

        it('should fall back to default input', () => {
            expect(escape(undefined)).toBe('');
        });
    });
});
