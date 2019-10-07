/**
 * @author  attilagyongyosi
 */
export interface ConfigRule {

    /**
     * The directory relative to the project root within
     * which this rule should be enforced.
     */
    directory: string;

    /**
     * Rule is either a used-defines regular expression
     * or one of the built-in supported conventions.
     * `kebab-case` is the one currently supported.
     */
    rule: string;

    /**
     * Potential list of strings to ignore
     * when linting paths.
     *
     * These will be stripped from file paths
     * before linting.
     */
    ignore?: string[];
}
