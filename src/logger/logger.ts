import { CliOptions } from '../cli/options/cli-options';
import { deColorize, green, red, yellow } from '../util/color-codes';

/**
 * Provides advanced console logging capabilities
 * for path-linter.
 *
 * For instance, it can output colorized log messages
 * based on a supplied instance of {@link CliOptions}.
 *
 * @author  attilagyongyosi
 */
export class Logger {
    private readonly infoPrefix = `[${green('info')}] `;
    private readonly warningPrefix = `[${yellow('warning')}] `;
    private readonly errorPrefix = `[${red('error')}] `;

    constructor(public options: CliOptions = new CliOptions()) {}

    public info(message: string): void {
        this.log('info', `${this.infoPrefix}${message}`);
    }

    public warning(message: string): void {
        this.log('warn', `${this.warningPrefix}${message}`);
    }

    public error(message: string): void {
        this.log('error', `${this.errorPrefix}${message}`);
    }

    private log(level: string, message: string): void {
        const newMessage = this.options.colorize ? message : deColorize(message);

        switch (level) {
        case 'info':
            console.info(newMessage);
            break;
        case 'warn':
            console.warn(newMessage);
            break;
        case 'error':
            console.error(newMessage);
            break;
        }
    }

}
