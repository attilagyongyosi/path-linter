import { ConfigRule } from '../config-rule';
import { ValidatorErrors } from './config-validator-errors';
import { SeverityLevels } from '../severity-levels';

const PROPERTY_RULES: string = 'rules';
const PROPERTY_SEVERITY: string = 'severity';
const PROPERTY_DIRECTORY = 'directory';
const PROPERTY_RULE = 'rule';
const PROPERTY_IGNORE = 'ignore';

type RuleValidator = (key: keyof ConfigRule) => boolean;

function ruleValidator(rule: ConfigRule): RuleValidator {
    return (key: keyof ConfigRule): boolean => rule.hasOwnProperty(key);
}

function checkDirectoryProperty(ruleValidator: RuleValidator): void {
    if (!ruleValidator(PROPERTY_DIRECTORY)) {
        throw new Error(ValidatorErrors.NO_DIRECTORY);
    }
}

function checkIgnoreProperty(rule: ConfigRule): void {
    if (ruleValidator(rule)(PROPERTY_IGNORE)) {
        if (!Array.isArray(rule.ignore)) {
            throw new Error(ValidatorErrors.IGNORE_IS_NOT_ARRAY);
        }
    }
}

function checkRuleProperty(ruleValidator: RuleValidator): void {
    if (!ruleValidator(PROPERTY_RULE)) { throw new Error(ValidatorErrors.NO_RULE);}
}

function checkSeverity(parsedSeverity: string): void {
    if (!Object.values(SeverityLevels).includes(parsedSeverity as SeverityLevels)) {
        throw new Error(ValidatorErrors.WRONG_SEVERITY);
    }
}

function validateRule(rule: ConfigRule): void {
    const validator = ruleValidator(rule);
    checkDirectoryProperty(validator);
    checkRuleProperty(validator);
    checkIgnoreProperty(rule);
}

export function validate(parsedConfig: { [key: string]: Record<string, unknown> | string }): boolean {
    if (!parsedConfig.hasOwnProperty(PROPERTY_RULES)) {
        throw new Error(ValidatorErrors.NO_RULES);
    }

    if (parsedConfig.hasOwnProperty(PROPERTY_SEVERITY)) {
        checkSeverity(parsedConfig[PROPERTY_SEVERITY] as string);
    }

    const rules: ConfigRule[] = parsedConfig[PROPERTY_RULES] as unknown as ConfigRule[];
    rules.forEach(validateRule);
    return true;
}
