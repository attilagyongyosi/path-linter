export enum ValidatorErrors {
    NO_RULES = 'Rules array missing in configuration!',
    NO_DIRECTORY = 'Directory property missing for rule!',
    NO_REGEXP_OR_CONVENTIONS = 'Either regExp or caseConvention should be specified for a rule!',
    REGEXP_AND_CONVENTIONS_PRESENT = 'Only specify either regExp or caseConvention!'
}
