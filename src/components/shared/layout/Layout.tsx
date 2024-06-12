import React, { useContext } from "react";
import { Header } from "@codegouvfr/react-dsfr/Header";
import ErrorBoundary from "./ErrorBoundary";
import { AuthContext } from "../../../lib/utils/provider/authProvider";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const oidcClient = useContext(AuthContext);
  const user = oidcClient?.oidcUser;
  return (
    <>
      {" "}
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header
          brandTop={false}
          homeLinkProps={{
            href: "/home",
            target: "_self",
            title: "Protools - Accueil",
          }}
          operatorLogo={{
            alt: "Logo Insee",
            imgUrl: "/insee.png",
            orientation: "vertical",
          }}
          quickAccessItems={[
            {
              iconId: "fr-icon-admin-line",
              linkProps: {
                href: "#",
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault();
                },
                onMouseOver: (e: React.MouseEvent) => {
                  (e.target as HTMLElement).style.backgroundColor = "inherit";
                },
                onMouseOut: (e: React.MouseEvent) => {
                  (e.target as HTMLElement).style.backgroundColor = "inherit";
                },
                style: {
                  cursor: "default",
                },
              },
              text: user
                ? user.firstName + " " + user.lastName
                : "Utilisateur non authentifié",
            },
          ]}
          serviceTagline="Orchestration des protocoles d'enquêtes"
          serviceTitle="Protools"
        />
        <ErrorBoundary>
          <div
            style={{
              flexGrow: 0.85,
              padding: "1.5rem",
            }}
          >
            {children}
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
