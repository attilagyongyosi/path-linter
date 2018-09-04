import { Logger } from '../logger';
import { green } from '../../util/color-codes';

describe('CLI Logger', () => {
    const LOG = new Logger();

    it('should display an info message', () => {
        spyOn(console, 'log').and.callThrough();
        LOG.info('Message');

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('[info] Message');
    });

    it('should display an error message', () => {
        spyOn(console, 'error').and.callThrough();
        LOG.error('Message');

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('[error] Message');
    });

    it('should display colorized message', () => {
        const COLOR_LOG = new Logger({ colorize: true, configFile: '' });
        spyOn(console, 'log').and.callThrough();

        COLOR_LOG.info('Message');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(`[${green('info')}] Message`);
    });
});
