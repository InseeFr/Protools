
import Keycloak from 'keycloak-js';

export const createOidcClient = async (evtUserActivity: any ,
  identityProvider: string,): Promise<any> => { 
  const minvaliditysecond = 300; // 5min minimum validity
    console.log('Create OIDC client')

   const keycloakInstance = new Keycloak(`${window.location.origin}/oidc.json`);
  // const keycloakInstance = new Keycloak({
  //   url: oidcConfig.url,
  //   realm: oidcConfig.realm,
  //   clientId: oidcConfig.clientId
  // });

  const isAuthenticated = await keycloakInstance
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-sso.html`,
      checkLoginIframe: false,
    })
    .catch(error => console.log(error));
  //console.log('isAuthentitcated:', isAuthenticated)

  const login = async () => {
    
    try {
      await keycloakInstance.login({ idpHint: identityProvider, redirectUri: window.location.href });
      console.log('Logged in')
    } catch (error) {
    console.error(error);
  }
  };

  const loadUserInfo = async () => {
    if (!isAuthenticated) {
      return {
        firstName: 'Fake',
        lastName: 'User',
      };
    }
    const userInfo = await keycloakInstance.loadUserProfile();
    const { firstName, lastName } = userInfo;
    if (firstName && lastName === undefined) {
      return {
        firstName: 'Fake',
        lastName: 'User',
      };
    }
    return {
      firstName,
      lastName,
    };
  };
  

  if (!isAuthenticated) {
    return {
      isUserLoggedIn: false,
      login,
    };
  }

  const oidcClient = {
    isUserLoggedIn: true,
    accessToken: keycloakInstance.token,
    oidcUser: await loadUserInfo(),
    logout: async ( redirectTo: string ) => {
      await keycloakInstance.logout({
        redirectUri: redirectTo || window.location.origin,
      });

      return new Promise(() => {});
    },
  };
  (function callee() {
    // TODO: write a correct object checking
    const msbeforeexpiration = keycloakInstance.tokenParsed ? (keycloakInstance.tokenParsed.exp? keycloakInstance.tokenParsed.exp * 1000 - Date.now(): 0): 0;

    setTimeout(
      async () => {
        console.log(
          `Oidc access token will expire in ${minvaliditysecond} seconds, waiting for user activity before renewing`,
        );

        await evtUserActivity();

        console.log("user activity detected. refreshing access token now");

        const error = await keycloakInstance.updateToken(-1).then(
          () => undefined,
          error => error,
        );

        if (error) {
          console.log("can't refresh oidc access token, getting a new one");
          //note: never resolves (?)
          await login();
        }

        oidcClient.accessToken = keycloakInstance.token;

        callee();
      },
      msbeforeexpiration - minvaliditysecond * 1000,
    );
  })();

  return oidcClient;
};
