import * as path from 'path';
import * as os from 'os';

export function setMockPathSeparator(separator: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (path as any).sep = separator;
}

export function mockWindowsPlatform(): void {
    spyOn(os, 'platform').and.returnValue('win32');
    setMockPathSeparator('\\');
}

export function mockUnixPlatform(): void {
    spyOn(os, 'platform').and.returnValue('unix');
    setMockPathSeparator('/');
}
