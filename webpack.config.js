const path = require("path");

module.exports = {
    entry : {
        'push-notification': './web/js/push-notificaton.ts',
        'firebase-messaging-sw': './web/js/firebase-messaging-sw.ts'
    },
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.ts']
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.tsx?$/,
    //             use: 'ts-loader',
    //             exclude: /node_modules/,
    //         }
    //     ]
    // }
}