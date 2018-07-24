export class Linter {
    constructor(private rule: RegExp) {}

    public lint(path: string): boolean {
        return this.rule.test(path);
    }
}
