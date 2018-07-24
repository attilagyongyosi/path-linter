import * as path from 'path';

import { Config } from '../config';
import { ConfigReader } from '../configReader';

const context = (fileName: string) => path.join(__dirname, fileName);

describe('The Configuration Reader', () => {
    it('should read a valid config file', () => {
        const config: Config = ConfigReader.read(context('mock-valid-config.json'));

        expect(config).toEqual({
            src: /^.*[a-z]$/,
            lib: /(123|xyz)+/
        });
    });

    it('should throw error for a non-existent file', () => {
        expect(() => {
            ConfigReader.read('./non-existent.json');
        }).toThrow();
    });

    it('should throw error on malformed file', () => {
        expect(() => {
            ConfigReader.read(context('mock-malformed-config.json'));
        }).toThrow();
    });

    it('should throw error on an invalid regular expression', () => {
        expect(() => {
            ConfigReader.read(context('mock-invalid-regexp-config.jsoN'));
        }).toThrow();
    });
});
