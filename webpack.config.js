const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: ["src"],
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
