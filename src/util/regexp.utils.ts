const REGEXP_SPECIAL_CHARS = /[-\/\\^$*+?.()|[\]{}]/g;

/**
 * Escapes regular expression special characters in
 * an input string.
 *
 * @param   string
 *          The input to escape characters in.
 *
 * @returns a new string which has the regexp
 *          special characters escaped.
 *
 * @author  attilagyongyosi
 */
export function escape(string: string = ''): string {
    return string.replace(REGEXP_SPECIAL_CHARS, '\\$&');
}
