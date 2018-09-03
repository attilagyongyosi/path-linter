/**
 * Shape for possible CLI options of
 * path-linter.
 *
 * @author  attilagyongyosi
 */
export class CliOptions {

    /**
     * Flag indicating whether console output should be colorized
     * using ANSI escape sequences.
     *
     * Can be set with the `--colorize` switch.
     * Defaults to `false`.
     */
    colorize?: boolean = false;

    /**
     * The relative path of the JSON file
     * containing linting configuration for
     * path-linter.
     *
     * Can be set with the `--config` switch.
     * Required.
     */
    configFile: string = '';
}
