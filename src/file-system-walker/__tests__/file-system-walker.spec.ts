import * as fs from 'fs';
import { FileSystemWalker } from '../file-system-walker';
import { FileSystemWalkerConfig } from '../file-system-walker-config';

describe('FileSystemWalker', () => {
    const CONFIG: FileSystemWalkerConfig = {
        onFileCallback: () => {},
        onFinishCallback: () => {},
        onErrorCallback: console.error
    };

    let walker: FileSystemWalker;

    beforeEach(() => {
        walker = new FileSystemWalker(CONFIG);
    });

    it('should call function when encountering files', (done) => {
        spyOn(walker.walkerConfig, 'onFileCallback').and.callThrough();
        spyOn(walker.walkerConfig, 'onFinishCallback').and.callFake(() => {
            expect(walker.walkerConfig.onFileCallback).toHaveBeenCalledTimes(7);
            done();
        });

        walker.walk('test/__fixture__');
    });

    it('should call a function when done', (done) => {
        walker.walkerConfig.onFinishCallback = () => {
            done();
        };

        walker.walk('test/__fixture__/empty');
    });

    it('should call a function when directory can not be read', (done) => {
        spyOn(walker.walkerConfig, 'onErrorCallback').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        walker.walk('test/__fixture__/non-existing');
    });

    it('should call a function when a path\'s stat can not be accessed', (done) => {
        spyOn(walker.walkerConfig, 'onErrorCallback').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        // @ts-ignore   path must be specified here.
        spyOn(fs, 'stat').and.callFake((path, callback) => {
            callback(new Error('What'));
        });

        walker.walk('test/__fixture__');
    });
});
