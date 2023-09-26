import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useMemo,
  useContext,
} from 'react';
import { createOidcClient } from '../auth/oidcConfig';
import { evtUserActivity } from '../events/evtUserActivity';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { ConfigContext } from './configProvider';
import Layout from '../../../components/shared/layout/Layout';

interface AuthProviderProps {
  children: ReactNode;
}

interface IOidcClient {
  isUserLoggedIn: boolean;
  login: () => void;
  accessToken: string;
}

export const AuthContext = createContext<IOidcClient | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const config = useContext(ConfigContext);
  const [oidcClient, setOidcClient] = useState<IOidcClient | null>(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcClientKC = await createOidcClient(
        evtUserActivity,
        config.identityProvider
      );
      console.log('oidcClientKC', oidcClientKC);
      return oidcClientKC;
    };

    const loadConf = async () => {
      console.log('loading oidc conf');
      if (config.authType === 'oidc') {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      }
    };

    if (config.authType === 'oidc' && oidcClient === null) {
      console.log('loadConf');
      loadConf();
    }
  }, [config.authType, oidcClient, config.identityProvider]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  return config.authType === 'none' ? (
    <Layout>
      <Typography
        variant="h2"
        sx={{
          padding: '2rem',
        }}
      >
        Cas sans oidc
      </Typography>
    </Layout>
  ) : oidcClient === null ? (
    <Layout>
      <Stack spacing={2} direction="row" sx={{ padding: '2rem' }}>
        <CircularProgress />
        <Typography variant="h2">OIDC client is null</Typography>
      </Stack>
    </Layout>
  ) : !oidcClient.isUserLoggedIn ? (
    (() => {
      oidcClient.login();
      return (
        <>
          <CircularProgress />
          <Typography variant="h2">Login en cours</Typography>
        </>
      );
    })()
  ) : (
    <AuthContext.Provider
      value={
        contextOidc || {
          isUserLoggedIn: false,
          login: () => {},
          accessToken: '',
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
