const ServiceWorkerWebpackPlugin = require ('serviceworker-webpack-plugin');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack=require("webpack");

module.exports={
    entry: {
        main: './src/index.js',
        article: './src/article.js'
      },
    output: {
        filename: "[name].js",
        path: __dirname + '/dist'
    },
    devServer: {
        host: 'localhost',
        disableHostCheck: true
      },
    module: {
        rules: [
         
            {
                test: /\.css$/i,
                exclude: /styles/,
                use: ["to-string-loader", "css-loader"]
            },
       
            {
                test: /\.css$/i,
                include: /styles/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        
                        loader: 'style-loader'
                    },
                    {
                        
                        loader: 'css-loader'
                    },
                    {
                       
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        
                        loader: 'sass-loader'
                    }
                ]
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:[
                    {
                        loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
                    }
                ]
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader' 
                    }
                ]
            },
            { 
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
            chunks:['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/article.html"),
            filename: "article.html",
            chunks:['article']
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/service-worker.js'),
          })
        
    ]
}