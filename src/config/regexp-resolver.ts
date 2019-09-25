import { ConfigRule } from './config-rule';
import { CONVENTION_MAP } from '../case-conventions/supported-case-conventions.enum';

export function resolveRegexp(rule: ConfigRule): RegExp {
    if (CONVENTION_MAP.hasOwnProperty(rule.rule)) {
        return CONVENTION_MAP[rule.rule];
    }

    return new RegExp(rule.rule);
}
