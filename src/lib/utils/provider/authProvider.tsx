import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useMemo,
  useContext,
} from "react";
import { createOidcClient } from "../auth/oidcConfig";
import { evtUserActivity } from "../events/evtUserActivity";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ConfigContext } from "./configProvider";
import Layout from "../../../components/shared/layout/Layout";
import { NoAuthProvider } from "./noAuthProvider";

interface AuthProviderProps {
  children: ReactNode;
}

export interface IOidcClient {
  isUserLoggedIn: boolean;
  login: () => void;
  accessToken: string;
  oidcUser: any;
}

export const AuthContext = createContext<IOidcClient | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const config = useContext(ConfigContext);
  const [oidcClient, setOidcClient] = useState<IOidcClient | null>(null);

  useEffect(() => {
    const loadOidcConf = async () => {
      const oidcClientKC = await createOidcClient(
        evtUserActivity,
        config.identityProvider,
      );
      return oidcClientKC;
    };

    const loadConf = async () => {
      if (config.authType === "oidc") {
        const conf = await loadOidcConf();
        setOidcClient(conf);
      }
    };

    if (config.authType === "oidc" && oidcClient === null) {
      loadConf();
    }
  }, [config.authType, oidcClient, config.identityProvider]);

  const contextOidc = useMemo(() => oidcClient, [oidcClient]);

  return config.authType === "none" ? (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={2} direction="column" sx={{ padding: "2rem" }}>
          <Typography variant="h2">
            Le serveur d'authentification n'est pas configuré
          </Typography>
          <Typography variant="subtitle1">
            L'application n'est pas disponible
          </Typography>
        </Stack>
      </Box>
    </Layout>
  ) : oidcClient === null ? (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={2} direction="row" sx={{ padding: "2rem" }}>
          <CircularProgress />
          <Typography variant="h2">Authentification en cours</Typography>
        </Stack>
      </Box>
    </Layout>
  ) : !oidcClient.isUserLoggedIn ? (
    (() => {
      oidcClient.login();
      return (
        <Layout>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={2} direction="row" sx={{ padding: "2rem" }}>
              <CircularProgress />
              <Typography variant="h2">Authentification en cours</Typography>
            </Stack>
          </Box>
        </Layout>
      );
    })()
  ) : (
    <AuthContext.Provider
      value={
        contextOidc || {
          isUserLoggedIn: false,
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          login: () => {},
          accessToken: "",
          oidcUser: {
            firstName: "Utilisateur",
            lastName: "inconnu",
          },
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
