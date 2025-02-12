const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		index: "./src/js/index.js",
	},
	output: {
		path: __dirname + "/assets/js",
		filename: "[name].js",
	},
};
