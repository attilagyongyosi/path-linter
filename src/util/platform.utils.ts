import * as os from 'os';

export function isWindows(): boolean {
    return os.platform() === 'win32';
}
