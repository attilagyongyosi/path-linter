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
            expect(walker.walkerConfig.onFileCallback).toHaveBeenCalledTimes(4);
            done();
        });

        walker.walk('test/__fixture__');
    });
});
