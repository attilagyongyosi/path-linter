import * as path from 'path';
import * as webpack from 'webpack';

const CONFIG: webpack.Configuration = {
    mode: 'production',
    target: 'node',
    entry: {
        main: './src/index.ts'
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
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true
        })
    ]
};

export default CONFIG;
