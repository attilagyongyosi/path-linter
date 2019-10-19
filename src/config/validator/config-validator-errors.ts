/**
 * Enumeration of error messages that the
 * config validation process could throw.
 *
 * @author  attilagyongyosi
 */
export enum ValidatorErrors {
    NO_RULES = 'Rules array missing in configuration!',
    NO_DIRECTORY = 'Directory property missing for rule!',
    NO_RULE = 'Missing linting rule for a directory in config!',
    WRONG_SEVERITY = 'The severity configuration can either be "error" or "warning"!',
    IGNORE_IS_NOT_ARRAY = 'The ignore property is not an array of strings!'
}
