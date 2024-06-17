const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    app: "/src/main.ts"
  },
  output: {
    path: resolve("dist"),
    filename: "[name].[contenthash:8].js"
  },
  // loader的执行顺序是从下往上执行
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [resolve("src")]
      },

      {
        test: /\.js?$/,
        use: "myBabelLoader",
        include: [resolve("src")]
      },
      {
        test: /\.js?$/,
        // exclude: [resolve("node_modules")],
        include: [resolve("src")],
        use: [
          {
            loader: 'loader',
            options: {
              name: "Tom&Jerry"
            }
          }
      
        ],
        // include: [resolve("src")]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "/public/index.html"
    }
    )
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  // loader 的解析规则
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/loader')
    ]
  },
  devtool: isProd ? "cheap-module-source-map" :
    "inline-cheap-module-source-map",
  devServer: {
    host: "localhost",
    stats: "errors-only",
    port: 9999,
    open: true
  }
}
