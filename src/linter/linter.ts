export class Linter {
    constructor(private readonly regExp: RegExp) {}

    public lint(filePath: string = ''): boolean {
        if (!filePath) { return false; }
        return this.regExp.test(filePath);
    }
}
