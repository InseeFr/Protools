# Protools
Survey protocol orchestrator, built with Vite in TS

## Prerequisites

Before you begin, ensure that you have Node and Yarn installed on your machine

## Getting Started

#### Clone this repository to your local machine.

   ```bash
   git clone git@github.com:InseeFr/Protools.git
   cd Protools
```

#### Install project dependencies using Yarn.

```
yarn
```

#### Create two JSON configuration files in the public folder:

- configuration.json for application-specific variables:

```
{
"API_URL": "...",
"AUTH_TYPE": "...",
"IDENTITY_PROVIDER": "..." 
}
```

- oidc.json for Keycloack configuration : 
``` 
{
  "realm": "...",
  "auth-server-url": "...",
  "ssl-required": "...",
  "resource": "...",
  "clientId": "...",
  "confidential-port": ...
}
```

#### Build the app
`yarn dev` or `yarn build`
