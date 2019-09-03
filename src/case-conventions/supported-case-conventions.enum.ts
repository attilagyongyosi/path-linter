/**
 * Enumeration that maps the naming conventions
 * that path-linter supports out-of-the-box
 * without the need to have it configured
 * with a regular expression by the user.
 *
 * @author  Attila_Gyongyosi
 * @since   1.3.0
 */
export enum SupportedCaseConventions {
    KEBAB_CASE = 'kebab-case'
}

export const CONVENTION_MAP: Map<SupportedCaseConventions, RegExp> = new Map();
CONVENTION_MAP.set(SupportedCaseConventions.KEBAB_CASE, new RegExp('^[a-z|_|\\.|\\-|\\\\|/]+\\.*$'));
