const path = require('path');

module.exports = {
    entry: './UI/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
