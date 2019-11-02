/**
 * This interface encapsulates properties
 * of linting results for a particular directory.
 *
 * @author  attilagyongyosi
 */
export interface LintingResult {
    directory: string;
    filesLinted: number;
    mismatchingFiles: string[];
    executionTime: number;
}
