import { AnsiColors } from './ansi-colors.enum';

/**
 * Special regular expression that matches ANSI escape
 * sequences.
 */
const ANSI_REGEX = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
].join('|');

export class Colorizer {
    public static green(text: string | number): string {
        return Colorizer.colorize(text, AnsiColors.GREEN);
    }

    public static red(text: string | number): string {
        return Colorizer.colorize(text, AnsiColors.RED);
    }

    public static blue(text: string | number): string {
        return Colorizer.colorize(text, AnsiColors.BLUE);
    }

    public static yellow(text: string | number): string {
        return Colorizer.colorize(text, AnsiColors.YELLOW);
    }

    public static cyan(text: string | number): string {
        return Colorizer.colorize(text, AnsiColors.CYAN);
    }

    public static deColorize(message: string): string {
        return message.replace(new RegExp(ANSI_REGEX, 'g'), '');
    }

    private static colorize(text: string | number, color: AnsiColors): string {
        return `${color}${text}${AnsiColors.RESET}`;
    }
}
