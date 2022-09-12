import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import theme from 'theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import RoutesWeb from 'routes/routes';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CacheProvider value={muiCache}>
		<ThemeProvider theme={theme}>
			<RoutesWeb />
		</ThemeProvider>
	</CacheProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
