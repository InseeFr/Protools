import React, { createContext, useEffect, useMemo, useState } from 'react';
import { getConfig } from '../../hooks/getConfig';

export interface ConfigContextType {
  apiUrl: string;
  keycloakAuth: string;
  identityProvider: string;
}

export const ConfigContext = createContext<ConfigContextType>({
  apiUrl: '',
  keycloakAuth: '',
  identityProvider: '',
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState<boolean>(false);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: '',
    keycloakAuth: 'none',
    identityProvider: '',
  });

  useEffect(() => {
    getConfig().then((data: any) => {
      console.log('Fetched config');
      setConfig({
        apiUrl: data.API_URL,
        keycloakAuth: data.KEYCLOAK_AUTH_TYPE,
        identityProvider: data.IDENTITY_PROVIDER,
      });
      setIsConfigLoaded(true);
    });
  }, []);

  const context = useMemo(() => config, [config]);
  return (
    <>
      {!isConfigLoaded && (
        <ConfigContext.Provider value={context}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
};
