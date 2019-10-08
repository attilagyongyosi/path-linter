import { Logger } from '../logger';
import { Colorizer } from '../../colorizer/colorizer';

const log = new Logger(true);

describe('Logger Integration Suite', () => {
    it('should log colorized info messages', () => {
        spyOn(console, 'info').and.callThrough();
        log.info('Message');
        expect(console.info).toHaveBeenNthCalledWith(1, `[${Colorizer.green('info')}] Message`);
    });

    it('should log colorized warning messages', () => {
        spyOn(console, 'warn').and.callThrough();
        log.warning('Message');
        expect(console.warn).toHaveBeenNthCalledWith(1, `[${Colorizer.yellow('warning')}] Message`);
    });

    it('should log colorized error messages', () => {
        spyOn(console, 'error').and.callThrough();
        log.error('Message');
        expect(console.error).toHaveBeenNthCalledWith(1, `[${Colorizer.red('error')}] Message`);
    });

    it('should log de-colorized error message', () => {
        const logger = new Logger();
        spyOn(console, 'info').and.callThrough();
        logger.info(`${Colorizer.cyan('Yo')}, this is a ${Colorizer.blue('test')}`);
        expect(console.info).toHaveBeenNthCalledWith(1, '[info] Yo, this is a test');
    });
});
