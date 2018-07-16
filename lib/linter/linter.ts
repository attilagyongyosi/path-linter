export class Linter {
    private static TEMP_REGEX = new RegExp(/^[a-z|.|\-|\\|/]+\.(ts|js|html|scss)$/);

    public lint(path: string): boolean {
        return Linter.TEMP_REGEX.test(path);
    }
}
