import { CliOptions } from '../cli/options/cli-options';
import { deColorize, green, red } from '../util/color-codes';

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
    private readonly errorPrefix = `[${red('error')}] `;

    constructor(public options: CliOptions = new CliOptions()) {}

    public info(message: string): void {
        this.log(`${this.infoPrefix}${message}`);
    }

    public error(message: string): void {
        this.log(`${this.errorPrefix}${message}`);
    }

    private log(message: string): void {
        if (!this.options.colorize) {
            console.log(deColorize(message));
        } else {
            console.log(message);
        }
    }

}
