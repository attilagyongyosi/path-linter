/**
 * This interface encapsulates properties
 * of linting results for a particular directory.
 *
 * @author  attilagyongyosi
 */
export interface DirectoryLintingResult {
    directory: string;
    filesLinted: number;
    mismatchingFiles: string[];
    executionTime: number;
}

export interface LintingResult {
    results: DirectoryLintingResult[];
    executionTime: number;
}
