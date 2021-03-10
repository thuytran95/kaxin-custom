// require("dotenv").config();
const path = require('path');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withImages = require('next-images');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./config/paths');
const getClientEnvironment = require('./config/env');
const dev = process.env.NODE_ENV !== 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = getClientEnvironment('/');

const compose = config => withBundleAnalyzer(withSass(withImages(withFonts(config))));

module.exports = compose({
    analyzeServer: !dev,
    analyzeBrowser: !dev,
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../../bundles/server.html'
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
        }
    },

    cssModules: true,
    sassLoaderOptions: {
        includePaths: [paths.appSrc]
    },
    cssLoaderOptions: {
        localIdentName: '[hash:base64:10]',
        camelCase: true
    },

    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static'
    },
    useFileSystemPublicRoutes: false,

    // onDemandEntries: {
    //     // period (in ms) where the server will keep pages in the buffer
    //     maxInactiveAge: 25 * 1000,
    //     // number of pages that should be kept simultaneously without being disposed
    //     pagesBufferLength: 10
    // },

    webpack: async (config, { buildId, dev, isServer, defaultLoaders }) => {
        config.plugins = config.plugins.map(plugin => {
            if (plugin.constructor.name === 'UglifyJsPlugin') {
                return new UglifyJsPlugin({
                    ...plugin.options,
                    uglifyOptions: {
                        ...plugin.options.uglifyOptions,
                        mangle: {
                            safari10: true
                        }
                    }
                });
                // return plugin;
            } else {
                return plugin;
            }
        });
        if (!dev) {
            if (env.stringified['process.env'].NODE_ENV !== '"production"') {
                throw new Error('Production builds must have NODE_ENV=production.');
            }
            config.devtool = false;
        }
        const originalEntry = config.entry;

        config.entry = async () => {
            const entries = await originalEntry();

            if (entries['main.js'] && !entries['main.js'].includes('./config/polyfills.js')) {
                entries['main.js'].unshift('./config/polyfills.js');
            }
            entries['pdf.worker'] = 'pdfjs-dist/build/pdf.worker.entry';
            return entries;
        };

        config.plugins.push(
            new InterpolateHtmlPlugin(HtmlWebpackPlugin,env.raw), 
            new webpack.DefinePlugin(env.stringified));
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [
                {
                    options: {
                        configFile: path.resolve('.eslintrc.json'),
                        eslintPath: require.resolve('eslint'),
                        emitWarning: dev,
                        failOnError: true
                    },
                    loader: require.resolve('eslint-loader')
                }
            ],
            include: [paths.appSrc]
        });
        return config;
    }
});
