import { strip } from '../string.utils';

describe('String Utils', () => {
    describe('the strip() function', () => {
        it('should strip away one substring', () => {
            expect(strip('Test this stuff', 'thi')).toBe('Test s stuff');
        });

        it('should strip away all occurrences of substring', () => {
            expect(strip('Test this thing', 'thi')).toBe('Test s ng');
        });

        it('should strip away multiple substrings', () => {
            expect(strip('What is happening', 'ha', 'ni')).toBe('Wt is ppeng');
        });

        it('should return the input text when nothing matches', () => {
            expect(strip('Test this thing', 'funk', 'disco')).toBe('Test this thing');
        });

        it('should handle falsy cases', () => {
            expect(strip(undefined, '')).toBe('');
            expect(strip('', 'what')).toBe('');
        });
    });
});
