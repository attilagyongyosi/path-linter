import * as path from 'path';

export class Linter {
    constructor(private readonly rule: RegExp) {}

    public lint(filePath: string): boolean {
        if (!filePath) { return false; }

        const pathParts = filePath.split(path.sep);

        for (const part in pathParts) {
            if (!this.lintPart(part)) {
                return false;
            }
        }

        return true;
    }

    private lintPart(filePathPart: string): boolean {
        return this.rule.test(filePathPart);
    }
}
