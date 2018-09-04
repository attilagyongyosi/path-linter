import * as fs from 'fs';
import { FileVisitor } from '../file-visitor';
import { FileVisitorConfig } from '../file-visitor-config';

describe('FileVisitor', () => {
    const CONFIG: FileVisitorConfig = {
        onFile: () => {},
        onFinish: () => {},
        onError: console.error,
        ignoreFiles: [ '.gitkeep' ]
    };

    let visitor: FileVisitor;

    beforeEach(() => {
        visitor = new FileVisitor(CONFIG);
    });

    it('should call function when encountering files', (done) => {
        spyOn(visitor.visitorConfig, 'onFile').and.callThrough();
        spyOn(visitor.visitorConfig, 'onFinish').and.callFake(() => {
            expect(visitor.visitorConfig.onFile).toHaveBeenCalledTimes(7);
            done();
        });

        visitor.walk('test/__fixture__');
    });

    it('should call a function when done', (done) => {
        visitor.visitorConfig.onFinish = () => {
            done();
        };

        visitor.walk('test/__fixture__/empty');
    });

    it('should call a function when directory can not be read', (done) => {
        spyOn(visitor.visitorConfig, 'onError').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        visitor.walk('test/__fixture__/non-existing');
    });

    it('should call a function when a path\'s stat can not be accessed', (done) => {
        spyOn(visitor.visitorConfig, 'onError').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        // @ts-ignore   path must be specified here.
        spyOn(fs, 'stat').and.callFake((path, callback) => {
            callback(new Error('What'));
        });

        visitor.walk('test/__fixture__');
    });
});
