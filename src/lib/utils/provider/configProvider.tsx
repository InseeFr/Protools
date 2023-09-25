import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { getConfig } from '../../hooks/getConfig';
import { CircularProgress } from '@mui/material';

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

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: '',
    keycloakAuth: 'none',
    identityProvider: '',
  });

  const context = useMemo(() => config, [config]);
  console.log(context);
  useEffect(() => {
    if (!isConfigLoaded) {
      getConfig().then((data: any) => {
        setConfig({
          apiUrl: data.API_URL,
          keycloakAuth: data.AUTH_TYPE,
          identityProvider: data.IDENTITY_PROVIDER,
        });
        setIsConfigLoaded(true);
      });
    }
  }, [config]);

  return (
    <>
      {!isConfigLoaded && (
        <div>
          <CircularProgress />
          <p>Chargement de la configuration</p>
        </div>
      )}
      {isConfigLoaded && (
        <ConfigContext.Provider value={context}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
};
