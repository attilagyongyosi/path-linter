import * as os from 'os';
import { SupportedPlatforms } from './supported-platforms';

export function isWindows(): boolean {
    return os.platform() === SupportedPlatforms.WINDOWS;
}
