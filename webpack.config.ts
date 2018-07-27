import * as path from 'path';
import { Configuration } from 'webpack';

const CONFIG: Configuration = {
    mode: 'production',
    target: 'node',
    entry: {
        lib: './src/index.ts'
    },
    output: {
        path: path.join(__dirname, 'lib')
    },
    resolve: {
        extensions: [ '.ts' ],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }]
    }
};

export default CONFIG;
