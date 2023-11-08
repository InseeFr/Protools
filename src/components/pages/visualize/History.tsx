import { Table } from "@codegouvfr/react-dsfr/Table";
import { ReactNode } from "react";

interface HistoryProps {
  history: ReactNode[][];
}
const HistoryActivity = (props: HistoryProps) => {
  const { history } = props;
  //console.log("History result:", history);
  return (
    <Table
      data={history}
      headers={["id", "Libellé", "Type", "Date Fin", "Durée (sec)"]}
    />
  );
};

export default HistoryActivity;
