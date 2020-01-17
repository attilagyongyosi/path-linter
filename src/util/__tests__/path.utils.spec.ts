import * as path from 'path';
import { convertPathSeparators } from '../path.utils';
import { mockUnixPlatform, mockWindowsPlatform, setMockPathSeparator } from '../../../test/utils/platform-mocking';

describe('Path Utils', () => {
    const ORIGINAL_PATH_SEPARATOR = path.sep;

    afterEach(() => {
        setMockPathSeparator(ORIGINAL_PATH_SEPARATOR);
    });

    describe('convertToPathSeparators()', () => {
        it('should detect and convert path separator characters on Windows', () => {
            mockWindowsPlatform();
            expect(convertPathSeparators('/test/path/file.txt')).toBe('\\test\\path\\file.txt');
        });

        it('should detect and convert path separator characters on Unix', () => {
            mockUnixPlatform();
            expect(convertPathSeparators('\\test\\path\\file.txt')).toBe('/test/path/file.txt');
        });

        it('should leave current platform separators unchanged on Windows', () => {
            mockWindowsPlatform();
            expect(convertPathSeparators('C:\\some\\windows\\path')).toBe('C:\\some\\windows\\path');
        });

        it('should leave current platform separators unchanged on Unix', () => {
            mockUnixPlatform();
            expect(convertPathSeparators('/some/windows/path')).toBe('/some/windows/path');
        });
    });
});
