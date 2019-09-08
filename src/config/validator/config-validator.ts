import { Config } from '../config';
import { ConfigRule } from '../config-rule';
import { NO_DIRECTORY_SPECIFIED_ERROR, NO_RULES_SPECIFIED_ERROR } from './config-validator-errors';

const PROPERTY_RULES: string = 'rules';
const PROPERTY_DIRECTORY: string = 'directory';

export function validate(parsedConfig: Config): boolean {
    if (!parsedConfig.hasOwnProperty(PROPERTY_RULES)) {
        throw new Error(NO_RULES_SPECIFIED_ERROR);
    }

    const rules: ConfigRule[] = parsedConfig.rules;
    rules.forEach(rule => {
        if (!rule.hasOwnProperty(PROPERTY_DIRECTORY)) {
            throw new Error(NO_DIRECTORY_SPECIFIED_ERROR);
        }

        if (!rule.hasOwnProperty('regExp') && !rule.hasOwnProperty('caseConventions')) {
            throw new Error('Either regExp or caseConvention should be specified for a rule!');
        }
    });

    return true;
}
