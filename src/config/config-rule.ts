import { SupportedCaseConventions } from '../case-conventions/supported-case-conventions.enum';

export interface ConfigRule {
    directory: string;
    caseConvention?: SupportedCaseConventions;
    regExp?: RegExp;
}
