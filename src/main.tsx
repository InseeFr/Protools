import React from 'react';
import ReactDOM from 'react-dom/client';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import App from './App';

startReactDsfr({ defaultColorScheme: 'system' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
