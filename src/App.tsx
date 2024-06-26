import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './lib/utils/provider/authProvider';
import {
  //ConfigContext,
  ConfigProvider,
} from "./lib/utils/provider/configProvider";
import Layout from './components/shared/layout/Layout';
import Router from './lib/routes/router';
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <MuiDsfrThemeProvider>
      <ConfigProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
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
