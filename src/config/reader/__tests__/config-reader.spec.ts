import * as path from 'path';
import { ConfigReader } from '../config-reader';
import fileSystemUtils from '../../../util/filesystem/filesystem.utils';
import { EMPTY_STRING } from '../../../util/string.utils';

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
    it('should read a valid config file', done => {
        ConfigReader.read(context('mock-valid-config.json')).then(config => {
            expect(config).toEqual(EXPECTED_VALID_CONFIG);
            done();
        });
    });

    it('should throw error for a non-existent file', done => {
        ConfigReader.read('./non-existent.json').catch(error => {
            expect(error).toBeDefined();
            done();
        });
    });

    it('should read one of the default config files when the supplied path is empty', done => {
        spyOn(fileSystemUtils, 'findFile').and.callFake(() => context('mock-valid-config.json'));
        ConfigReader.read(EMPTY_STRING).then(config => {
            expect(config).toEqual(EXPECTED_VALID_CONFIG);
            done();
        });
    });

    it('should throw an error when default config paths are not found', done => {
        spyOn(fileSystemUtils, 'findFile').and.callFake(() => context('non-existent.json'));
        ConfigReader.read(EMPTY_STRING).catch(error => {
            expect(error).toBeDefined();
            done();
        });
    });
});
