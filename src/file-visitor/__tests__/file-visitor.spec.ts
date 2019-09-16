import * as fs from 'fs';
import { FileVisitor } from '../file-visitor';
import { FileVisitorConfig } from '../file-visitor-config';

const FIXTURE_PATH: string = 'test/fixture';

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
        const NUMBER_OF_FILES_IN_FIXTURE_FOLDER: number = 7;
        spyOn(visitor.visitorConfig, 'onFile').and.callThrough();
        spyOn(visitor.visitorConfig, 'onFinish').and.callFake(() => {
            expect(visitor.visitorConfig.onFile).toHaveBeenCalledTimes(NUMBER_OF_FILES_IN_FIXTURE_FOLDER);
            done();
        });

        visitor.walk(FIXTURE_PATH);
    });

    it('should call a function when done', (done) => {
        visitor.visitorConfig.onFinish = (): void => {
            done();
        };

        visitor.walk(`${FIXTURE_PATH}/empty`);
    });

    it('should call a function when directory can not be read', (done) => {
        spyOn(visitor.visitorConfig, 'onError').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        visitor.walk(`${FIXTURE_PATH}/non-existing`);
    });

    it('should call a function when a path\'s stat can not be accessed', (done) => {
        spyOn(visitor.visitorConfig, 'onError').and.callFake((error) => {
            expect(error).toBeDefined();
            done();
        });

        spyOn(fs, 'stat').and.callFake((_, callback) => {
            callback(new Error('What'));
        });

        visitor.walk(FIXTURE_PATH);
    });
});
