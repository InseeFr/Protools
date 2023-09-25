import React from 'react';
import { Header } from '@codegouvfr/react-dsfr/Header';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header
        brandTop={false}
        homeLinkProps={{
          href: '/',
          title: 'Protools - Accueil',
        }}
        operatorLogo={{
          alt: 'Logo Insee',
          imgUrl: '/insee.png',
          orientation: 'vertical',
        }}
        quickAccessItems={[
          {
            iconId: 'fr-icon-admin-line',
            linkProps: {
              href: '/',
            },
            text: 'FakeUser',
          },
        ]}
        serviceTagline="Orchestration des protocoles d'enquêtes"
        serviceTitle="Protools"
      />
      <ErrorBoundary>
        <div
          style={{
            padding: '10v',
          }}
        >
          {children}
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
