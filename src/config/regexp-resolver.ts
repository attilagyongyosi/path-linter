import { ConfigRule } from './config-rule';
import { CONVENTION_MAP } from '../case-conventions/supported-case-conventions.enum';

export function resolveRegexp(rule: ConfigRule): RegExp {
    if (rule.regExp) { return new RegExp(rule.regExp); }

    if (!rule.caseConvention) { return new RegExp(''); }

    const convention: RegExp = CONVENTION_MAP[rule.caseConvention];
    if (convention) { return convention; }

    return new RegExp('');
}
