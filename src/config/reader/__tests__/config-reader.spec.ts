import * as path from 'path';
import { ConfigReader } from '../config-reader';

jest.mock('../../validator/config-validator');

const context = (fileName: string): string => path.join(__dirname, fileName);

const EXPECTED_VALID_CONFIG = {
    rules: [ {
        directory: 'src',
        regExp: '^.*[a-z]$'
    }, {
        directory: 'lib',
        regExp: '(123|xyz)+'
    } ]
};

describe('The Configuration Reader', () => {
    it('should read a valid config file', () => {
        expect(ConfigReader.read(context('mock-valid-config.json'))).toEqual(EXPECTED_VALID_CONFIG);
    });

    it('should throw error for a non-existent file', () => {
        expect(() => ConfigReader.read('./non-existent.json')).toThrow();
    });
});
