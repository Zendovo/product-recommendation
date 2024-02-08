const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const minCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].css"
});

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const config = (webpackEnv) => {
    const development = webpackEnv === 'development';

    return {
        devtool: 'eval-source-map',
        // devServer: {
        //     disableHostCheck: true
        // },
        entry: './src/index.tsx',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        development ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-preset-env')({
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    }),
                                ],
                            },
                        },
                        'sass-loader',
                    ],
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss']
        },
        plugins: [minCssExtractPlugin, htmlPlugin],
    }
};

module.exports = (env, argv) => {
    return config(argv.mode);
};