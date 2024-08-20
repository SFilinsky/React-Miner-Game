const path = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {camelCase} = require("css-loader/dist/utils");

module.exports = function(env) {
    
    const isProd = env.production === true;
    
    console.log(`Building for ${ isProd ? 'production' : 'development' }`);

    const config = {
        mode: isProd ? 'production' : 'development',
        entry: [ path.resolve(__dirname, 'src/index.tsx') ],
        devtool: isProd ? false : 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
            new ProvidePlugin({
                "React": "react",
            }),
            new MiniCssExtractPlugin()
        ],
        output: {
            path: path.resolve(__dirname, 'dist/'),
            publicPath: './',
            filename: 'bundle.js',
            assetModuleFilename:  '[name][ext]'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                            plugins: [
                                '@babel/plugin-transform-runtime', 
                                '@babel/plugin-syntax-jsx'
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader, 
                        {
                            loader: 'css-loader',
                            options: {
                                modules:
                                    isProd ?
                                    {
                                        namedExport: false,
                                        localIdentName: '[hash:base64:5]',
                                        // exportLocalsConvention: 'camel-case-only'
                                    }
                                    :
                                    {
                                        namedExport: false,
                                        localIdentName: '[local]__[hash:base64:5]',
                                        // exportLocalsConvention: 'camel-case-only'
                                        // getLocalIdent: (context, localIdentName, localName) => {
                                        //     return camelCase(localName);
                                        // },
                                    },
                            },
                        },
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: 'asset/resource'
                }
            ]
        },
    };

    if (!isProd) {
        config.devServer = {
            allowedHosts: 'all',
            watchFiles: [
                'dist/**/*'
            ],
            static: path.join(__dirname, './dist'),
            port: 9000,
            hot: true,
            compress: false,
        };

        config.watchOptions = {
            aggregateTimeout: 500,
            poll: 1000,
        }

        config.output = {
            publicPath: 'http://localhost:9000/',
        }

        config.entry.push('webpack/hot/poll?2000');
    }

    return config;
};