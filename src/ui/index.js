import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import theme from 'ui/theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App from './App';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

//TODO : Put back strict mode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CacheProvider value={muiCache}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</CacheProvider>
);

reportWebVitals();
