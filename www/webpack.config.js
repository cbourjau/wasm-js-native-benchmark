const CopyWebpackPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require('path');

const dist = path.resolve(__dirname, "dist");

const workerConfig = {
    entry: "./worker.js",
    target: "webworker",
    plugins: [
	new WasmPackPlugin({
	    crateDirectory: path.resolve(__dirname, "..")
	}) 
    ],
    resolve: {
	extensions: [".js", ".wasm"]
    },
    mode: "production",
    output: {
	path: dist,
	filename: "worker.js"
    }
};

const appConfig = {
  entry: "./bootstrap.js",
  output: {
    path: dist,
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};

module.exports = [appConfig, workerConfig];
