import { ConfigRule } from '../config/config-rule';
import { resolveRegexp } from '../config/regexp-resolver';
import { strip } from '../util/string.utils';

/**
 * @todo    handle path stripping within CLI code?
 */
export class Linter {
    constructor(private readonly rule: ConfigRule) {}

    public lint(filePath: string = ''): boolean {
        if (!filePath) { return false; }
        if (this.rule.ignore) { filePath = strip(filePath, ...this.rule.ignore); }
        return resolveRegexp(this.rule).test(filePath);
    }
}
