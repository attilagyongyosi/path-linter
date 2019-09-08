import * as fs from 'fs';
import { Config } from './config';
import { validate } from './validator/config-validator';

/**
 * Functional utility class which can
 * read and process a supplied configuration file.
 *
 * @author  attilagyongyosi
 * @see     Config
 */
export class ConfigReader {

    /**
     * Given a path to a JSON-formatted configuration file,
     * this method will read it and process its contents into
     * an instance of {@link Config}, if possible.
     *
     * The result will be an object where keys are treated as
     * relative directories and values as corresponding regular
     * expression to lint files in that particular directory.
     *
     * @param   configPath
     *          A path to a configuration file.
     *
     * @returns an instance of {@link Config}, parsed from the
     *          contents of the file.
     *
     * @throws  an error when the file can not be read or is
     *          malformed.
     */
    public static read(configPath: string): Config {
        const data = fs.readFileSync(configPath, { encoding: 'utf-8' });
        const parsed = JSON.parse(data.toString());

        if (!validate(parsed)) { throw new Error('What is even happening'); }
        return parsed;
    }
}
