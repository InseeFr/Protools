module.exports = {
	webpack: {
		configure: {
			experiments: {
				topLevelAwait: true,
			},
			devserver: {
				historyApiFallback: true,
			},
		},
	},
};
