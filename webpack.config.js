const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const sass = require('sass')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },

      {
        test: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
              // https://www.npmjs.com/package/sass-loader
              // Prefer `dart-sass`
              // keeping sass instead of node-sass because its currently being used in parcel.
              // this will fix - import ~node+modules
              implementation: sass,
              sassOptions: (loaderContext) => {
                console.log('loaderCointext = ', loaderContext)
              }
            }
          }
        ]
      },
      {
        test: /\.(s[ac]|c)ss$/,
        exclude: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', 'scss', 'css'],
    // Try but failed !!
    // alias: {
    //   '~node_modules': './node_modules'
    // }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_PATH': isDevelopment ? '/dist' : '/'
    })
  ], 
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
}
