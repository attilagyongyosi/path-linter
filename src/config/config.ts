/**
 * Linting configuration shape.
 *
 * Denotes an object where keys are relative directory
 * paths and values are regular expression which will be
 * used to lint file paths in that particular directory.
 *
 * @author  attilagyongyosi
 * @see     ConfigReader
 */
import { ConfigRule } from './config-rule';

export interface Config {
    rules: ConfigRule[];
}
