const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const server = new WebpackDevServer(Webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
});

server.listen(3000, '192.168.1.3', (err, result) => {

    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});
