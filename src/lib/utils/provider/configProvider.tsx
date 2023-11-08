import React, { createContext, useEffect, useMemo, useState } from 'react';
import { getConfig } from '../../hooks/getConfig';

export interface ConfigContextType {
  apiUrl: string;
  authType: string;
  identityProvider: string;
}

export const ConfigContext = createContext<ConfigContextType>({
  apiUrl: '',
  authType: '',
  identityProvider: '',
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [isConfigLoaded, setIsConfigLoaded] = useState<boolean>(false);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: "",
    authType: "none",
    identityProvider: "",
  });

  useEffect(() => {
    if (!isConfigLoaded) {
      getConfig().then((data: any) => {
        setConfig({
          apiUrl: data.API_URL,
          authType: data.AUTH_TYPE,
          identityProvider: data.IDENTITY_PROVIDER,
        });
        setIsConfigLoaded(true);
      });
    } else {
      console.log("Config already loaded");
    }
  }, []);

  const context = useMemo(() => config, [config]);

  //console.log('ConfigProvider: ', config);
  return (
    <>
      {isConfigLoaded && (
        <ConfigContext.Provider value={context}>
          {children}
        </ConfigContext.Provider>
      )}
    </>
  );
};
