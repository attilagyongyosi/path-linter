const ANSI_REGEX = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
].join('|');

export const COLORS = {
    GREEN: '\x1b[32m',
    BLUE: '\x1b[1m\x1b[34m',
    RED: '\x1b[31m',
    RESET: '\x1b[0m'
};

export function green(text: string): string {
    return `${COLORS.GREEN}${text}${COLORS.RESET}`;
}

export function red(text: string): string {
    return `${COLORS.RED}${text}${COLORS.RESET}`;
}

export function blue(text: string): string {
    return `${COLORS.BLUE}${text}${COLORS.RESET}`;
}

export function deColorize(message: string): string {
    return message.replace(new RegExp(ANSI_REGEX, 'g'), '');
}
