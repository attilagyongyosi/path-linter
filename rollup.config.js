import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const SOURCE_DIR = 'src';
const BUNDLE_DIR = 'lib';

export default {
    input: `${SOURCE_DIR}/index.ts`,
    output: [{
        file: `${BUNDLE_DIR}/index.js`,
        format: 'cjs',
        plugins: [ terser() ]
    }],
    external: [
        'fs',
        'path',
        'os'
    ],
    plugins: [
        typescript()
    ]
};
