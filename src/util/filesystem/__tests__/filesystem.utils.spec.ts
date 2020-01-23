import * as path from 'path';
import utils from '../filesystem.utils';

const context = (fileName: string): string => path.join(__dirname, fileName);

describe('Filesystem Utils', () => {
    describe('fileExists()', () => {
        it('should return true when path exists and is a file', done => {
            utils.fileExists(context('filesystem.utils.spec.ts')).then(doesExist => {
                expect(doesExist).toBe(true);
                done();
            });
        });

        it('should return false when path exists but is a directory', done => {
            utils.fileExists(context('/')).then(doesExist => {
                expect(doesExist).toBe(false);
                done();
            });
        });

        it('should return false when path does not exist', done => {
            utils.fileExists(context('phantom.js')).then(doesExist => {
                expect(doesExist).toBe(false);
                done();
            });
        });
    });

    describe('findFile()', () => {
        it('should find a single file', done => {
            jest.spyOn(utils, 'fileExists').mockImplementation(() => Promise.resolve(true));
            utils.findFile('.', 'filesystem.utils.spec.ts').then(foundFile => {
                expect(foundFile).toBe('filesystem.utils.spec.ts');
                done();
            });
        });

        it('should return first match from multiple findings', done => {
            jest.spyOn(utils, 'fileExists').mockImplementation(() => Promise.resolve(true));
            utils.findFile('', 'file1', 'file2', 'file3').then(foundFile => {
                expect(foundFile).toBe('file1');
                done();
            });
        });

        it('should yield an empty path when no files are found', done => {
            jest.spyOn(utils, 'fileExists').mockImplementation(() => Promise.resolve(false));
            utils.findFile('.', 'file1', 'file2').then(result => {
                expect(result).toBe('');
                done();
            });
        });
    });
});
