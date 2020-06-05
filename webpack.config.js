const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./js/script.js', './css/style.scss'],
    output: {
        filename: './js/app.js',
        path: path.resolve(__dirname),
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: './css/style.css'
        }),
      ],
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './css/',
                },
              },
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },
};