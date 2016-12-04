const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const sources = path.join(__dirname, './src');
const ExtractCSS = require('extract-text-webpack-plugin');

// Merge with base configuration
//-------------------------------
_.merge(config, {
    cache: false,
    target: 'web',
    devtool: 'source-map',
    entry: {
        bundle: ['babel-polyfill', './src/client/index']
    },
    output: {
        publicPath: 'http://localhost:3000/build/',
        libraryTarget: 'var'
    }
});

console.info('Running production build...');

// config.module.loaders[0].query.presets.splice(0,1);

// Add the loader for css extract
config.module.loaders.push({
    test: /\.styl$/,
    loader: ExtractCSS.extract('css-loader!stylus-loader'),
    include: path.join(sources, 'assets/css'),
    exclude: /\.git$/
});

// delete config.output.libraryTarget;
// delete config.output.pathinfo;

// Save files to disk
//-------------------------------
//config.output.path = path.join(__dirname, '../build')

if (!config.plugins) {
    config.plugins = [];
}


config.plugins.push(
new ExtractCSS('bundle.css', { allChunks: true }),
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    }
}));

// Set some environment variables
//-------------------------------
config.plugins.push(
    new webpack.DefinePlugin({
        'global.isClient': true,
        'process.env.BLUEBIRD_WARNINGS': '0',
        'process.env.NODE_ENV': JSON.stringify('production')
    })
);

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
    throw new Error('Using "eval" source-maps may break the build');
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config);
compiler.run((err, stats) => {

    if (err) {
        throw err;
    }

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        chunkModules: false
    }));

    if (stats.hasErrors()) {
        console.warn('Finished compiling webpack with errors...');
        console.warn(stats.compilation.errors.toString());
    }
    else {
        console.info('Finished compiling webpack');
    }
});

module.exports = config;
