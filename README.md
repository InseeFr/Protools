# Protools UI

Protools front-end. Built with React JS & Material UI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About

Web application to execute and monitor survey protocols 🦊

## QuickStart

### Manual installation

```bash
git clone git@github.com:InseeFr/Protools.git
cd Protools
npm install
npm start
```

### With Docker

```
docker run -p 5000:80 -t inseefr/protools
```

Protools UI will be available at http://localhost:3000

#### Configuration

As for now, the production environment does not allow us to use environment variables, which greatly annoys us.
A temporary (and outdated) solution is to use a configuration file, which is located in the `public` folder.
For now it is only used to set the API URL.

```json
{
	"API_URL": "http://localhost:8080/"
}
```
