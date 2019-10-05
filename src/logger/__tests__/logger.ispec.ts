import { Logger } from '../logger';
import { green, red, yellow } from '../../util/color-codes';

const log = new Logger({ colorize: true, configFile: '' });

describe('Logger Integration Suite', () => {
    it('should log colorized info messages', () => {
        spyOn(console, 'info').and.callThrough();
        log.info('Message');
        expect(console.info).toHaveBeenNthCalledWith(1, `[${green('info')}] Message`);
    });

    it('should log colorized warning messages', () => {
        spyOn(console, 'warn').and.callThrough();
        log.warning('Message');
        expect(console.warn).toHaveBeenNthCalledWith(1, `[${yellow('warning')}] Message`);
    });

    it('should log colorized error messages', () => {
        spyOn(console, 'error').and.callThrough();
        log.error('Message');
        expect(console.error).toHaveBeenNthCalledWith(1, `[${red('error')}] Message`);
    });
});
