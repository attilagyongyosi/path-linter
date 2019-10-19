import { validate } from '../config-validator';
import { SupportedCaseConventions } from '../../../case-conventions/supported-case-conventions.enum';
import { ValidatorErrors } from '../config-validator-errors';

describe('Config Validator', () => {
    it('should return true when there are no validation errors', () => {
        const config = {
            rules: [ {
                directory: './directory',
                rule: SupportedCaseConventions.KEBAB_CASE,
                ignore: [ '__tests__' ]
            }, {
                directory: './an/other',
                rule: /.*/
            } ]
        };

        expect(validate(config)).toBe(true);
    });

    it('should throw error when config has no rules array', () => {
        const config = {};
        expect(() => validate(config)).toThrow(ValidatorErrors.NO_RULES);
    });

    it('should throw error when directory property is missing', () => {
        const config = {
            rules: [ {
                rule: '.*\\.ts'
            } ]
        };

        expect(() => validate(config)).toThrow(new Error(ValidatorErrors.NO_DIRECTORY));
    });

    it('should throw error when no rule is specified', () => {
        const config = {
            rules: [ {
                directory: 'test-dir'
            } ]
        };

        expect(() => validate(config)).toThrow(new Error(ValidatorErrors.NO_RULE));
    });

    it('should validate a valid severity property', () => {
        const config = { severity: 'warning', rules: [] };
        expect(() => validate(config)).not.toThrowError();
    });

    it('should throw error on an invalid severity property', () => {
        const config = { severity: 'funky', rules: [] };
        expect(() => validate(config)).toThrow(ValidatorErrors.WRONG_SEVERITY);
    });

    it('should throw an error when there is an ignore property which is not an array', () => {
        const config = { rules: [ { directory: '', rule: '.*',  ignore: 'test' } ] };
        expect(() => validate(config)).toThrow(ValidatorErrors.IGNORE_IS_NOT_ARRAY);
    });
});
