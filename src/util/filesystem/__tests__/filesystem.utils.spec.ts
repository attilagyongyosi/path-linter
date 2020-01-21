import { fileExists } from '../filesystem.utils';
import * as path from 'path';

const context = (fileName: string): string => path.join(__dirname, fileName);

describe('Filesystem Utils', () => {
    describe('fileExists()', () => {
        it('should return true when path exists and is a file', done => {
            fileExists(context('filesystem.utils.spec.ts')).then(doesExist => {
                expect(doesExist).toBe(true);
                done();
            });
        });

        it('should return false when path exists but is a directory', done => {
            fileExists(context('/')).then(doesExist => {
                expect(doesExist).toBe(false);
                done();
            });
        });

        it('should return false when path does not exist', done => {
            fileExists(context('phantom.js')).then(doesExist => {
                expect(doesExist).toBe(false);
                done();
            });
        });
    });
});
