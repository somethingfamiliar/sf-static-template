const path = require('path')

const PostCSSPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  stats: {
    colors: true,
    preset: 'minimal',
  },
  entry: {
    scripts: path.resolve(__dirname, 'src/assets/js/scripts.js'),
    style: path.resolve(__dirname, 'src/assets/css/style.css'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets/'),
    publicPath: '/assets/',
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/')
      return `${filepath}/[name][ext]`
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [PostCSSPresetEnv] } },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|jxl|woff|woff2|eot|ttf|otf|json)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './[name].min.css',
    }),
  ],
}
