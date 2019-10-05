import { AnsiColors } from './ansi-colors.enum';

/**
 * Special regular expression that matches ANSI escape
 * sequences.
 */
const ANSI_REGEX = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
].join('|');

export function colorize(text: string, color: AnsiColors): string {
    return `${color}${text}${AnsiColors.RESET}`;
}

export function green(text: string): string {
    return colorize(text, AnsiColors.GREEN);
}

export function red(text: string): string {
    return colorize(text, AnsiColors.RED);
}

export function blue(text: string): string {
    return colorize(text, AnsiColors.BLUE);
}

export function cyan(text: string): string {
    return colorize(text, AnsiColors.CYAN);
}

export function deColorize(message: string): string {
    return message.replace(new RegExp(ANSI_REGEX, 'g'), '');
}
