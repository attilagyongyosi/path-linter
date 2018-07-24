import * as fs from 'fs';

import { Config } from './config';

export class ConfigReader {
    public static read(configPath: string): Config {
        try {
            const data = fs.readFileSync(configPath, { encoding: 'utf-8' });
            return JSON.parse(data.toString(), (key, value) => key ? new RegExp(value) : value);
        } catch(error) {
            throw error;
        }
    }
}
