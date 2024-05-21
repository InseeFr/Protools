
import { Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import TasksBpmnElements from "../../../lib/model/displayModels/tasksBpmnElements";

interface TasksProps {
  bpmnElements: TasksBpmnElements[];
  processName: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identifiant",
    flex: 0.3,
    minWidth: 100,
    description: "Identifiant de la tâche",
  },
  {
    field: "name",
    headerName: "Nom",
    flex: 0.3,
    minWidth: 200,
    description: "Nom de la tâche",
  },
  {
    field: "documentation",
    headerName: "Documentation",
    flex: 0.1,
  },
];
const Tasks = (props: TasksProps) => {
  const { bpmnElements } = props;
  //console.log("bpmnElement result:", bpmnElements);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {bpmnElements.length > 0 ? (
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={bpmnElements}
          columns={columns}
          autoHeight
          pagination
          getRowClassName={() => "row--style"}
        />
      ) : (
        <Typography>Aucune tâche</Typography>
      )}
    </div>
  );
};

export default Tasks;
