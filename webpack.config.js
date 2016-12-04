const Path = require('path');
const Webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/client/index'
    ],
    output: {
        path: Path.join(__dirname, 'docs'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: Path.join(__dirname, 'src/client')
        }, {
            test: /\.styl$/,
            loaders: ['style', 'css', 'stylus']
        },
        {
            test: /\.json$/,
            loader: 'json-loader',
            include: Path.join(__dirname, 'prototype')
        }]
    }
};

