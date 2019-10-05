import { Logger } from '../logger';
import { green, yellow } from '../../util/color-codes';

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

    it('should display colorized message', () => {
        const COLOR_LOG = new Logger({ colorize: true, configFile: '' });
        spyOn(console, 'info').and.callThrough();
        spyOn(console, 'warn').and.callThrough();

        COLOR_LOG.info('Message');
        expect(console.info).toHaveBeenNthCalledWith(1, `[${green('info')}] Message`);

        COLOR_LOG.warning('Message');
        expect(console.warn).toHaveBeenNthCalledWith(1, `[${yellow('warning')}] Message`);
    });
});
