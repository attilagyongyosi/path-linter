import { Config } from '../config';
import { ConfigRule } from '../config-rule';
import { ValidatorErrors } from './config-validator-errors';

const PROPERTY_RULES: string = 'rules';
const PROPERTY_DIRECTORY: string = 'directory';

function checkDirectoryProperty(rule: ConfigRule): void {
    if (!rule.hasOwnProperty(PROPERTY_DIRECTORY)) {
        throw new Error(ValidatorErrors.NO_DIRECTORY);
    }
}

function checkHasEitherRegexpOrConvention(rule: ConfigRule): void {
    if (!rule.hasOwnProperty('regExp') && !rule.hasOwnProperty('caseConvention')) {
        throw new Error(ValidatorErrors.NO_REGEXP_OR_CONVENTIONS);
    }
}

function checkIfBothRegexpAndConventionIsPresent(rule: ConfigRule): void {
    if (rule.hasOwnProperty('regExp') && rule.hasOwnProperty('caseConvention')) {
        throw new Error(ValidatorErrors.REGEXP_AND_CONVENTIONS_PRESENT);
    }
}

function validateRule(rule: ConfigRule): void {
    checkDirectoryProperty(rule);
    checkHasEitherRegexpOrConvention(rule);
    checkIfBothRegexpAndConventionIsPresent(rule);
}

export function validate(parsedConfig: Config): boolean {
    if (!parsedConfig.hasOwnProperty(PROPERTY_RULES)) {
        throw new Error(ValidatorErrors.NO_RULES);
    }

    const rules: ConfigRule[] = parsedConfig.rules;
    rules.forEach(validateRule);
    return true;
}
