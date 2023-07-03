export const buildOidcConfiguration = ({ oidcConf }) => {
  const { origin } = window.location;
  return {
    ...oidcConf,
    redirect_uri: `${origin}/protools/authentication-v2/callback`,
    post_logout_redirect_uri: `${origin}/`,
    silent_redirect_uri: `${origin}/protools/authentication-v2/silent_callback`,
  };
};

export const buildOidcConfigurationFromKeycloak = ({ keycloakConf }) => {
  const { origin } = window.location;
  const { realm, 'auth-server-url': authServer, resource } = keycloakConf;
  return {
    authority: `${authServer}/realms/${realm}`,
    client_id: resource,
    redirect_uri: `${origin}/protools/authentication-v2/callback`,
    response_type: 'code',
    post_logout_redirect_uri: `${origin}/`,
    scope: 'openid profile email',
    silent_redirect_uri: `${origin}/protools/authentication-v2/silent_callback`,
    automaticSilentRenew: true,
    loadUserInfo: true,
  };
};