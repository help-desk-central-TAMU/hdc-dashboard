const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            // Add your loaders here
            // For example, if you're using Babel to transpile your JavaScript files:
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // Add more loaders as needed
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
};
