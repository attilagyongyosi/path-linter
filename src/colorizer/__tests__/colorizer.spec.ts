import { Colorizer } from '../colorizer';

describe('Colorizer', () => {
    describe('deColorize() function', () => {
        it('should remove color sequences from strings', () => {
            let testString = `${Colorizer.blue('Whatever')}`;
            let deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('Whatever');

            testString = `${Colorizer.red('Red Text')}, yo`;
            deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('Red Text, yo');

            testString = `Some ${Colorizer.green('green text')}, yo`;
            deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('Some green text, yo');

            testString = `Some ${Colorizer.cyan('cyan text')}, yo`;
            deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('Some cyan text, yo');

            testString = `[${Colorizer.green('info')}] Some ${Colorizer.green('green text')}`;
            deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('[info] Some green text');

            testString = `[${Colorizer.yellow('warning')}] Some ${Colorizer.yellow('yellow text')}`;
            deColorized = Colorizer.deColorize(testString);
            expect(deColorized).toBe('[warning] Some yellow text');
        });
    });
});
