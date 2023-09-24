import { useState, useEffect, useMemo, ReactNode, createContext } from "react";
import { createOidcClient } from "../auth/oidcConfig";
import { evtUserActivity } from "../events/evtUserActivity";
import { CircularProgress, Typography } from "@mui/material";
import React from "react";

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

const AuthProvider = ({ authType, identityProvider, children }: AuthProviderProps) => {
  const [oidcClient, setOidcClient] = useState<IOidcClient | null>(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcClientKC = await createOidcClient(evtUserActivity, identityProvider);
      return oidcClientKC;
    };

    const loadConf = async () => {
      if (authType === "oidc") {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      }
    };

    if (authType && oidcClient === null) {
      loadConf();
    }
  }, [authType, oidcClient, identityProvider]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  if (oidcClient === null) {

    if (!oidcClient) {
      return <CircularProgress />;
    }

    if (!oidcClient.isUserLoggedIn) {
      if (authType === "none") {
        return <Typography variant="h2">{"Cas sans oidc"}</Typography>;
      }
    } else {
      oidcClient.login();
      return <CircularProgress />;
    }

    return <AuthContext.Provider value={contextOidc || { isUserLoggedIn: false, login: () => {} }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;