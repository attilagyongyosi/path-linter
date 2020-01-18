export const EMPTY_STRING: string = '';

export function escape(string: string): string {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

/**
 * Strips away a set of substrings from a given string.
 *
 * @param   text
 *          The base string to strip away parts from.
 *
 * @param   toStrip
 *          Variable number of string parameters to strip away from
 *          the `text` parameter.
 *
 * @author  attilagyongyosi
 */
export function strip(text: string = '', ...toStrip: string[]): string {
    const replaceRegexp = new RegExp(toStrip.reduce((regexp, current) => `${regexp}${escape(current)}|`, EMPTY_STRING), 'g');
    return text.replace(replaceRegexp, EMPTY_STRING);
}
