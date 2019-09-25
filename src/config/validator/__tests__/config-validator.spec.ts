import { validate } from '../config-validator';
import { SupportedCaseConventions } from '../../../case-conventions/supported-case-conventions.enum';

describe('Config Validator', () => {
    it('should return true when there are no validation errors', () => {
        const config = {
            rules: [ {
                directory: './directory',
                rule: SupportedCaseConventions.KEBAB_CASE
            }, {
                directory: './an/other',
                rule: /.*/
            } ]
        };

        expect(validate(config)).toBe(true);
    });
});
