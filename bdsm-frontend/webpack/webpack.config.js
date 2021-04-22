const webpack = require('webpack')
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../public'),
        historyApiFallback: true,
        compress: true,
        port: 8000,
        open: true,
        proxy: {
            '/api/': {
                target: {
                    host: '127.0.0.1',
                    protocol: 'http',
                    port: 3000
                }
            }
        }
    },
    mode: "development",
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        })
    ],
    devtool: 'source-map',
};

module.exports = config;