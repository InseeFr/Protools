import { useContext } from 'react';
import { IOidcClient } from './authProvider';
import { ConfigContext } from './configProvider';
import Layout from '../../../components/shared/layout/Layout';
import { Typography } from '@mui/material';

interface NoAuthProps {
  setOidcClient: (oidcClient: IOidcClient) => void;
  children: React.ReactNode;
}
export const NoAuthProvider = (props: NoAuthProps) => {
  const { setOidcClient, children } = props;
  const { apiUrl } = useContext(ConfigContext);

  const login = (id: string) => {
    const fakeUserName = {
      given_name: 'Prénom',
      family_name: 'Nom',
      preferred_username: 'prenom.nom',
    };

    const oidcClient = {
      isUserLoggedIn: true,
      accessToken: '',
      oidcUser: {
        id: id,
        given_name: fakeUserName.given_name,
        family_name: fakeUserName.family_name,
        preferred_username: fakeUserName.preferred_username,
        inseegroupedefaut: ['ADMIN'], // ?
      },
      login: () => (window.location.href = '/'),
      logout: () => (window.location.href = '/'),
    };
    setOidcClient(oidcClient);
  };
  return (
    <>
      {children}
      <Typography
        variant="subtitle1"
        fontStyle={'italic'}
        // sx={{
        //   padding: '1rem',
        // }}
      >
        Cas sans oidc
      </Typography>
    </>
  );
};
