/**
 * Linting configuration shape.
 *
 * path-linter's configuration files will be
 * parsed and validated against this object
 * structure.
 *
 * @author  attilagyongyosi
 * @see     ConfigReader
 */
import { ConfigRule } from './config-rule';
import { SeverityLevels } from './severity-levels';

export interface Config {
    colorize: boolean;
    severity?: SeverityLevels;
    rules: ConfigRule[];
}
