export enum ValidatorErrors {
    NO_RULES = 'Rules array missing in configuration!',
    NO_DIRECTORY = 'Directory property missing for rule!',
    NO_RULE = 'Missing linting rule for a directory in config!',
    WRONG_SEVERITY = 'The severity configuration can either be "error" or "warnign"!',
    IGNORE_IS_NOT_ARRAY = 'The ignore property is not an array of strings!'
}
