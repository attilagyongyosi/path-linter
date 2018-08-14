import { CliOptions } from '../cli/cli-options';
import { COLORS } from '../util/color-codes';

export class Logger {
    private readonly infoPrefix = `[${COLORS.GREEN}info${COLORS.RESET}] `;
    private readonly errorPrefix = `[${COLORS.RED}error${COLORS.RESET}] `;

    constructor(private options: CliOptions) {}

    public info(message: string): void {
        this.log(`${this.infoPrefix}${message}`);
    }

    public error(message: string): void {
        this.log(`${this.errorPrefix}${message}`);
    }

    private log(message: string): void {
        if (!this.options.colorize) {
            console.log(this.deColorize(message));
        } else {
            console.log(message);
        }
    }

    private deColorize(message: string): string {
        let replaced = message;

        Object.values(COLORS).forEach((value: string) => {
            replaced = replaced.replace(value, '');
        });

        return replaced;
    }

}
