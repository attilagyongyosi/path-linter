import { blue, deColorize, green, red } from '../color-codes';

describe('Color Code Utils', () => {
    describe('deColorize() function', () => {
        it('should remove color sequences from strings', () => {
            let testString = `${blue('Whatever')}`;
            let deColorized = deColorize(testString);
            expect(deColorized).toBe('Whatever');

            testString = `${red('Red Text')}, yo`;
            deColorized = deColorize(testString);
            expect(deColorized).toBe('Red Text, yo');

            testString = `Some ${green('green text')}, yo`;
            deColorized = deColorize(testString);
            expect(deColorized).toBe('Some green text, yo');

            testString = `[${green('info')}] Some ${green('green text')}`;
            deColorized = deColorize(testString);
            expect(deColorized).toBe('[info] Some green text');
        });
    });
});
