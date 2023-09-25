import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import Router from './lib/routes/router';
import { AuthProvider } from './lib/utils/provider/authProvider';

import './App.css';
import Layout from './components/shared/layout/Layout';
import { ConfigProvider } from './lib/utils/provider/configProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ConfigProvider>
        <AuthProvider>
          <MuiDsfrThemeProvider>
            <QueryClientProvider client={queryClient} contextSharing>
              <ReactQueryDevtools initialIsOpen={false} />
              <Layout>
                <RouterProvider router={Router} />
              </Layout>
            </QueryClientProvider>
          </MuiDsfrThemeProvider>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
