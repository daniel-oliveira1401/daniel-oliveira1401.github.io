const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: path.join(__dirname, "js", "index.js"),
	mode: "development",
	output: {
		path: path.join(__dirname),
		filename: "index.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|easy-bank-landing-page|chuva-landing-page)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					}
				]
			},
			{
				test: /\.sass$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "style.bundle.css"
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname)
		},
		watchFiles: ["js/*", "index.html", "sass/*"],
		port: 8000
	}
};
