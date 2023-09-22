import { useState, useEffect, useMemo, ReactNode } from "react";
import { createOidcClient } from "../auth/oidcConfig";
import { evtUserActivity } from "../events/evtUserActivity";
import { CircularProgress, Typography } from "@mui/material";

interface AuthProviderProps {
children: ReactNode;
}

const AuthProvider = (authType: string, identityProvider: string, children:AuthProviderProps) => {
// TODO : Create interface for oidcClient
    const [oidcClient, setOidcClient] = useState({
        isUserLoggedIn: true,
        accesstoken: '',
        oidcuser: null,
        logout: async ( redirectTo: string ) => {
            return new Promise(() => { });
        },
        login: async () => { 
                return new Promise(() => { });
        }
    });


    useEffect(() => {
        const loadOidcConf = async () => {
            const oidcClientKC = await createOidcClient(
                evtUserActivity,
                identityProvider,
            );
            return oidcClientKC;
            };

            const loadConf = async () => {
                if (authType === 'oidc') {
                const conf = await loadOidcConf();
                setOidcClient(conf);
                } ;
            };

        if (authType && oidcClient === null) loadConf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authType]);

    const contextOidc = useMemo(() => oidcClient, [oidcClient]);

    if (oidcClient === null) {
        return <CircularProgress />;
    }
    if (!oidcClient?.isUserLoggedIn) {
        if (authType === 'none') {
            return <Typography variant="h2">{"Cas sans oidc"}</Typography>;
        }
        } else {
        oidcClient.login();
        return <CircularProgress />;
    }

    return <AuthContext.Provider value={contextOidc}>{children}</AuthContext.Provider>;
};

export default AuthProvider;