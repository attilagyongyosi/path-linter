import { ConfigRule } from '../config-rule';
import { ValidatorErrors } from './config-validator-errors';

const PROPERTY_RULES: string = 'rules';
const PROPERTY_DIRECTORY = 'directory';
const PROPERTY_REGEXP = 'regExp';
const PROPERTY_CONVENTION = 'caseConvention';

type RuleValidator = (key: keyof ConfigRule) => boolean;

function checkDirectoryProperty(ruleValidator: RuleValidator): void {
    if (!ruleValidator(PROPERTY_DIRECTORY)) {
        throw new Error(ValidatorErrors.NO_DIRECTORY);
    }
}

function checkHasEitherRegexpOrConvention(ruleValidator: RuleValidator): void {
    if (!ruleValidator(PROPERTY_REGEXP) && !ruleValidator(PROPERTY_CONVENTION)) {
        throw new Error(ValidatorErrors.NO_REGEXP_OR_CONVENTIONS);
    }
}

function checkIfBothRegexpAndConventionIsPresent(ruleValidator: RuleValidator): void {
    if (ruleValidator(PROPERTY_REGEXP) && ruleValidator(PROPERTY_CONVENTION)) {
        throw new Error(ValidatorErrors.REGEXP_AND_CONVENTIONS_PRESENT);
    }
}

function ruleValidator(rule: ConfigRule): RuleValidator {
    return (key: keyof ConfigRule): boolean => rule.hasOwnProperty(key);
}

function validateRule(rule: ConfigRule): void {
    const validator = ruleValidator(rule);
    checkDirectoryProperty(validator);
    checkHasEitherRegexpOrConvention(validator);
    checkIfBothRegexpAndConventionIsPresent(validator);
}

export function validate(parsedConfig: { [key: string]: object }): boolean {
    if (!parsedConfig.hasOwnProperty(PROPERTY_RULES)) {
        throw new Error(ValidatorErrors.NO_RULES);
    }

    const rules: ConfigRule[] = parsedConfig[PROPERTY_RULES] as ConfigRule[];
    rules.forEach(validateRule);
    return true;
}
