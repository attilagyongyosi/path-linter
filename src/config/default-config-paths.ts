/**
 * The file names in this array
 * are considered default configuration file names.
 *
 * If no --config switch is given to the
 * path-linter executable, it will try to locate
 * one of these in the project's directory,
 * in the order they are specified here.
 *
 * If none is found, an error message is displayed.
 *
 * @see     ConfigReader
 *
 * @since   2.1.0
 * @author  attilagyongyosi
 */
export const DEFAULT_CONFIG_PATHS: string[] = [
    'path-linter.json',
    '.path-linter.json',
    '.pathlinterrc'
];
