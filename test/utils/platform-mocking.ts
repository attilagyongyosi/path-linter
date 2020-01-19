import * as path from 'path';
import * as os from 'os';
import { SupportedPlatforms } from '../../src/util/supported-platforms';

export function setMockPathSeparator(separator: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (path as any).sep = separator;
}

export function mockWindowsPlatform(): void {
    spyOn(os, 'platform').and.returnValue(SupportedPlatforms.WINDOWS);
    setMockPathSeparator('\\');
}

export function mockUnixPlatform(): void {
    spyOn(os, 'platform').and.returnValue(SupportedPlatforms.UNIX);
    setMockPathSeparator('/');
}
