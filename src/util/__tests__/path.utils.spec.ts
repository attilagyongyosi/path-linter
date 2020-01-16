import { convertPathSeparators } from '../path.utils';
import { isWindows } from '../platform.utils';

describe('Path Utils', () => {
    describe('convertToPathSeparators()', () => {
        it('should detect and convert path separator characters according to platform', () => {
            if (isWindows()) {
                expect(convertPathSeparators('/test/path/file.txt')).toBe('\\test\\path\\file.txt');
            } else {
                expect(convertPathSeparators('\\test\\path\\file.txt')).toBe('/test/path/file.txt');
            }
        });

        it('should leave current platform separators unchanged', () => {
            if (isWindows()) {
                expect(convertPathSeparators('C:\\some\\windows\\path')).toBe('C:\\some\\windows\\path');
            } else {
                expect(convertPathSeparators('/some/windows/path')).toBe('/some/windows/path');
            }
        });
    });
});
