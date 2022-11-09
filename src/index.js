import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import theme from 'theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import RoutesWeb from 'routes/routes';
import { useConfiguration } from 'core/hooks';
import Preloader from 'components/shared/preloader/component';

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

reportWebVitals();

export const AppContext = React.createContext();

const App = () => {
	const { configuration } = useConfiguration();

	return (
		<root.div id='root'>
			{configuration && (
				<CacheProvider value={muiCache}>
					<ThemeProvider theme={theme}>
						<RoutesWeb />
					</ThemeProvider>
				</CacheProvider>
			)}
			{!configuration && <Preloader />}
		</root.div>
	);
};

export default App;
