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
import { CircularProgress, Typography } from '@mui/material';
import { ConfigContext, ConfigContextType } from './configProvider';

interface AuthProviderProps {
  children: ReactNode;
}

interface IOidcClient {
  isUserLoggedIn: boolean;
  login: () => void;
  accessToken: string;
}

export const AuthContext = createContext<IOidcClient | null>(null);

const configContext: ConfigContextType = useContext(ConfigContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [oidcClient, setOidcClient] = useState<IOidcClient | null>(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcClientKC = await createOidcClient(
        evtUserActivity,
        configContext.identityProvider
      );
      return oidcClientKC;
    };

    const loadConf = async () => {
      if (configContext.keycloakAuth === 'oidc') {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      }
    };

    if (configContext.keycloakAuth === 'oidc' && oidcClient === null) {
      loadConf();
    }
  }, [configContext.keycloakAuth, oidcClient, configContext.identityProvider]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  return oidcClient === null ? (
    <>
      <CircularProgress />
      <Typography variant="h2">OIDC client is null</Typography>
    </>
  ) : !oidcClient.isUserLoggedIn ? (
    configContext.keycloakAuth === 'none' ? (
      <Typography variant="h2">Cas sans oidc</Typography>
    ) : (
      (() => {
        oidcClient.login();
        return (
          <>
            <CircularProgress />
            <Typography variant="h2">Login en cours</Typography>
          </>
        );
      })()
    )
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
