module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['prettier', 'react-app', 'eslint:recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'mui-unused-classes'],
	rules: { 'no-unused-vars': 'warn' },
};
