
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import HistoryActivitiesGrouped from "../../../lib/model/displayModels/historyActivitiesGrouped";

interface HistoryProps {
  history: HistoryActivitiesGrouped[];
}

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    flex: 0.08,
    minWidth: 100,
    description: "Date de début",

  },
  {
    field: "label",
    headerName: "Tâche",
    flex: 0.4,
    minWidth: 100,
    description: "Nom de la tâche",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.08,
    minWidth: 100,
    description: "Type de la tâche",
  },
  {
    field: "count",
    headerName: "Nombre d'exécutions",
    flex: 0.08,
  },
  {
    field: "avgDuration",
    headerName: "Durée moyenne (sec)",
    flex: 0.08,
  },
  {
    field: "lastExecution",
    headerName: "Dernière exécution",
    flex: 0.08,
  },
];
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
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={history}
          columns={columns}
          autoHeight
          pagination
          getRowClassName={() => "row--style"}
        />
      ) : (
        <p>Historique vide</p>
      )}
    </div>
  );
};

export default HistoryActivity;
