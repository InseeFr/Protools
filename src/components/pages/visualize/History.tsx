import { Table } from "@codegouvfr/react-dsfr/Table";
import { ReactNode } from "react";

interface HistoryProps {
  history: ReactNode[][];
}


const HistoryActivity = (props: HistoryProps) => {
  const { history } = props;
  //console.log("History result:", history);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {history.length > 0 ? (
        <Table
          data={history}
          headers={["id", "Libellé", "Type", "Date Fin", "Durée (sec)"]}
          fixed
        />
      ) : (
        <p>Historique vide</p>
      )}
    </div>
  );
};

export default HistoryActivity;
