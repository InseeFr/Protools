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

//TODO go to react 18 ;)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CacheProvider value={muiCache}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</CacheProvider>
	</React.StrictMode>
);

reportWebVitals();
