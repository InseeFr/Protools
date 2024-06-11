import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import App from "./App";
import { useState } from "react";
import { useColorScheme } from "./lib/utils/theme/colorScheme";

// TODO: Move this to a separate file
enum ColorScheme {
  Light = "light",
  Dark = "dark",
  System = "system"
}

const Main = () => {
  const { colorScheme } = useColorScheme();

  startReactDsfr({ defaultColorScheme: colorScheme });

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Main />);
