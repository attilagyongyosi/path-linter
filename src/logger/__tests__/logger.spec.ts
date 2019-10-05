import { Logger } from '../logger';
import { Colorizer } from '../../colorizer/colorizer';
import { AnsiColors } from '../../colorizer/ansi-colors.enum';

describe('CLI Logger', () => {
    const LOG = new Logger();

    it('should display an info message', () => {
        spyOn(console, 'info').and.callThrough();
        LOG.info('Message');
        expect(console.info).toHaveBeenNthCalledWith(1, '[info] Message');
    });

    it('should display a warning message', () => {
        spyOn(console, 'warn').and.callThrough();
        LOG.warning('Message');
        expect(console.warn).toHaveBeenNthCalledWith(1, '[warning] Message');
    });

    it('should display an error message', () => {
        spyOn(console, 'error').and.callThrough();
        LOG.error('Message');
        expect(console.error).toHaveBeenNthCalledWith(1, '[error] Message');
    });

    it('should display a colorized message when enabled', () => {
        const colorizingLogger = new Logger(true);
        const expectedMessage = `[${AnsiColors.RED}error${AnsiColors.RESET}] Message`;

        spyOn(console, 'error').and.callThrough();
        spyOn(Colorizer, 'red').and.returnValue(expectedMessage);
        colorizingLogger.error('Message');
        expect(console.error).toHaveBeenNthCalledWith(1, expectedMessage);
    });
});
