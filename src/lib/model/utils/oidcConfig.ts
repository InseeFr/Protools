interface KeycloakConfig {
  realm: string;
  'auth-server-url': string;
  'ssl-required': string;
  resource: string;
  clientId: boolean;
  'confidential-port': number;
}