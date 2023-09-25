import { useState, useEffect, ReactNode, createContext, useMemo } from 'react';
import { createOidcClient } from '../auth/oidcConfig';
import { evtUserActivity } from '../events/evtUserActivity';
import { CircularProgress, Typography } from '@mui/material';

interface AuthProviderProps {
  authType: string;
  identityProvider: string;
  children: ReactNode;
}

interface IOidcClient {
  isUserLoggedIn: boolean;
  login: () => void;
}

export const AuthContext = createContext<IOidcClient | null>(null);

export const AuthProvider = ({
  authType,
  identityProvider,
  children,
}: AuthProviderProps) => {
  const [oidcClient, setOidcClient] = useState<IOidcClient | null>(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcClientKC = await createOidcClient(
        evtUserActivity,
        identityProvider
      );
      return oidcClientKC;
    };

    const loadConf = async () => {
      if (authType === 'oidc') {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      }
    };

    if (authType === 'oidc' && oidcClient === null) {
      loadConf();
    }
  }, [authType, oidcClient, identityProvider]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  return oidcClient === null ? (
    <CircularProgress />
  ) : !oidcClient.isUserLoggedIn ? (
    authType === 'none' ? (
      <Typography variant="h2">Cas sans oidc</Typography>
    ) : (
      (() => {
        oidcClient.login();
        return <CircularProgress />;
      })()
    )
  ) : (
    <AuthContext.Provider
      value={contextOidc || { isUserLoggedIn: false, login: () => {} }}
    >
      {children}
    </AuthContext.Provider>
  );
};
