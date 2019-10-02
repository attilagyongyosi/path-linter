/**
 * Enumeration that maps the naming conventions
 * that path-linter supports out-of-the-box
 * without the need to have it configured
 * with a regular expression by the user.
 *
 * @author  attilagyongyosi
 */
export enum SupportedCaseConventions {
    KEBAB_CASE = 'kebab-case'
}

export const CONVENTION_MAP: { [key: string]: RegExp } = {
    [SupportedCaseConventions.KEBAB_CASE.valueOf()]: new RegExp(/^[a-z1-9\-\\/.]+\.[a-z]{2,5}$/)
};
