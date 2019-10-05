import { ConfigRule } from '../config-rule';
import { ValidatorErrors } from './config-validator-errors';
import { SeverityLevels } from '../severity-levels';

const PROPERTY_RULES: string = 'rules';
const PROPERTY_SEVERITY: string = 'severity';
const PROPERTY_DIRECTORY = 'directory';
const PROPERTY_RULE = 'rule';

type RuleValidator = (key: keyof ConfigRule) => boolean;

function checkDirectoryProperty(ruleValidator: RuleValidator): void {
    if (!ruleValidator(PROPERTY_DIRECTORY)) {
        throw new Error(ValidatorErrors.NO_DIRECTORY);
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

function ruleValidator(rule: ConfigRule): RuleValidator {
    return (key: keyof ConfigRule): boolean => rule.hasOwnProperty(key);
}

function validateRule(rule: ConfigRule): void {
    const validator = ruleValidator(rule);
    checkDirectoryProperty(validator);
    checkRuleProperty(validator);
}

export function validate(parsedConfig: { [key: string]: object | string }): boolean {
    if (!parsedConfig.hasOwnProperty(PROPERTY_RULES)) {
        throw new Error(ValidatorErrors.NO_RULES);
    }

    if (parsedConfig.hasOwnProperty(PROPERTY_SEVERITY)) {
        checkSeverity(parsedConfig[PROPERTY_SEVERITY] as string);
    }

    const rules: ConfigRule[] = parsedConfig[PROPERTY_RULES] as ConfigRule[];
    rules.forEach(validateRule);
    return true;
}
