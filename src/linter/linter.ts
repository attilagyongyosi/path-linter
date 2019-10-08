import { ConfigRule } from '../config/config-rule';
import { resolveRegexp } from '../config/regexp-resolver';

export class Linter {
    constructor(private readonly rule: ConfigRule) {}

    public lint(filePath: string = ''): boolean {
        if (!filePath) { return false; }
        return resolveRegexp(this.rule).test(filePath);
    }
}
