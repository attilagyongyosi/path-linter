import { validate } from '../config-validator';
import { ValidatorErrors } from '../config-validator-errors';
import { SupportedCaseConventions } from '../../../case-conventions/supported-case-conventions.enum';

describe('Config Validator', () => {
    it('should return true when there are no validation errors', () => {
        const config = {
            rules: [ {
                directory: './directory',
                caseConvention: SupportedCaseConventions.KEBAB_CASE
            }, {
                directory: './an/other',
                regExp: /.*/
            } ]
        };

        expect(validate(config)).toBe(true);
    });

    it('should throw error when rules property is missing', () => {
        expect(() => validate({})).toThrow(ValidatorErrors.NO_RULES);
    });

    it('should throw error when directory is missing in a rule', () => {
        const wrongConfig = { rules: [ { regExp: '' } ] };
        expect(() => validate(wrongConfig)).toThrow(ValidatorErrors.NO_DIRECTORY);
    });

    it('should throw error when neither regExp nor caseConvention is specified in a rule', () => {
        const wrongConfig = { rules: [ { directory: 'some-dir' } ] };
        expect(() => validate(wrongConfig)).toThrow(ValidatorErrors.NO_REGEXP_OR_CONVENTIONS);
    });

    it('should throw error when both regExp and caseConvention is specified in a rule', () => {
        const wrongConfig = {
            rules: [
                {
                    directory: 'some-dir',
                    regExp: '.*',
                    caseConvention: 'kebab'
                }
            ]
        };
        expect(() => validate(wrongConfig)).toThrow(ValidatorErrors.REGEXP_AND_CONVENTIONS_PRESENT);
    });
});
