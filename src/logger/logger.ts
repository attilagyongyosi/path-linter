import { CliOptions } from '../cli/cli-options';
import { deColorize, green, red } from '../util/color-codes';

export class Logger {
    private readonly infoPrefix = `[${green('info')}] `;
    private readonly errorPrefix = `[${red('error')}] `;

    constructor(private options: CliOptions) {}

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
