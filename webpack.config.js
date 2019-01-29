/* eslint import/no-dynamic-require: 0 */
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const { NODE_ENV } = process.env;
const mode = (NODE_ENV && NODE_ENV.trim() === 'production') ? 'production' : 'development';

const configFileName = `./saia-config.${mode}`;
const config = require(configFileName);

/**
 * SCSS configs
 */
const sass = {
  loader: 'sass-loader',
};

const css = {
  loader: 'css-loader',
};

const style = {
  loader: 'style-loader',
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer('last 3 versions', 'ie 10'),
      cssnano(),
    ],
  },
};

/**
 * Webpack config
 */
module.exports = {
  mode,
  watch: mode === 'development',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  entry: {
    'saia-pf-button': path.resolve(`${__dirname}/src/js/button.js`),
    'saia-pf-widget': path.resolve(`${__dirname}/src/App.jsx`),
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                  },
                }],
              ],
            },
          },
        ],
      },

      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                  },
                }],
              ],
              plugins: [
                ['@babel/plugin-transform-react-jsx', {
                  pragma: 'h',
                }],
              ],
            },
          },
        ],
      },

      {
        test: /\.scss/,
        use: [style, css, postcss, sass],
      },

      {
        test: /\.(jpe?g|png|gif|svg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: mode !== 'production',
            },
          },
        ],
      },

      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: mode === 'production',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
    ],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories',
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(config.API_HOST),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src/index.html'),
      inject: true,
      inlineSource: 'widget.(js|css)$',
      excludeChunks: ['saia-pf-button'],
      minify: {
        removeComments: mode === 'production',
        collapseWhitespace: mode === 'production',
        removeAttributeQuotes: mode === 'production',
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  devtool: (mode === 'production') ? false : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
