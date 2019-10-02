import { ConfigRule } from '../config-rule';
import { resolveRegexp } from '../regexp-resolver';
import { CONVENTION_MAP, SupportedCaseConventions } from '../../case-conventions/supported-case-conventions.enum';

describe('Config Rule Regexp Resolver', () => {
    it('should return with given regexp when rule not matches built-in conventions', () => {
        const TEST_RULE: ConfigRule = {
            directory: 'test-dir',
            rule: '.*\\.ts'
        };

        expect(resolveRegexp(TEST_RULE)).toStrictEqual(/.*\.ts/);
    });

    it('should resolve built-in convention based on its name', () => {
        const TEST_KEBAB_RULE: ConfigRule = {
            directory: 'test-dir',
            rule: 'kebab-case'
        };

        expect(resolveRegexp(TEST_KEBAB_RULE)).toBe(CONVENTION_MAP[SupportedCaseConventions.KEBAB_CASE]);
    })
});
