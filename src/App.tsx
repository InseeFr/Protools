import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './lib/utils/provider/authProvider';
import {
  ConfigContext,
  ConfigProvider,
} from './lib/utils/provider/configProvider';
import Layout from './components/shared/layout/Layout';
import Router from './lib/routes/router';
import './App.css';
import { useContext } from 'react';

const queryClient = new QueryClient();

function App() {
  const config = useContext(ConfigContext);
  return (
    <MuiDsfrThemeProvider>
      <ConfigProvider>
        <AuthProvider
          authType={config.keycloakAuth}
          identityProvider={config.identityProvider}
        >
          <QueryClientProvider client={queryClient} contextSharing>
            <ReactQueryDevtools initialIsOpen={false} />
            <Layout>
              <RouterProvider router={Router} />
            </Layout>
          </QueryClientProvider>
        </AuthProvider>
      </ConfigProvider>
    </MuiDsfrThemeProvider>
  );
}

export default App;
