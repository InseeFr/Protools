import axios from 'axios';
import { fetchConfig } from 'core/config';

const instance = axios.create({
	baseURL: await fetchConfig().then((config) => {
		console.log('config.API_URL', config.API_URL);
		return config.API_URL;
	}),
});

export default instance;
