export const getEnvVar = (key) =>
	window?._env_?.[key] || window.env[`REACT_APP_${key}`];
