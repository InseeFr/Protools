import { Box, Typography } from "@mui/material";
import { GridColDef, DataGrid, frFR } from "@mui/x-data-grid";
import TasksBpmnElements from "../../../lib/model/displayModels/tasksBpmnElements";

interface TasksProps {
  bpmnElements: TasksBpmnElements[];
  processName: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Identifiant",
    flex: 0.1,
    minWidth: 100,
    description: "Identifiant de la tâche",
    renderCell: (params) => (
      <div style={{ textAlign: "left", margin: "2px 0" }}>{params.value}</div>
    ),
  },
  {
    field: "name",
    headerName: "Nom",
    flex: 0.15,
    minWidth: 200,
    description: "Nom de la tâche",
    renderCell: (params) => (
      <div style={{ textAlign: "left", margin: "2px 0" }}>{params.value}</div>
    ),
  },
  {
    field: "documentation",
    headerName: "Documentation",
    flex: 0.2,
    renderCell: (params) => (
      <div style={{ textAlign: "left", margin: "2px 0" }}>{params.value}</div>
    ),
  },
];
const Tasks = (props: TasksProps) => {
  const { bpmnElements } = props;
  //console.log("bpmnElement result:", bpmnElements);
  return (
    <Box sx={{ width: "100%" }}>
      {bpmnElements.length > 0 ? (
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={bpmnElements}
          columns={columns}
          autoHeight
          pagination
          getRowHeight={() => "auto"}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        />
      ) : (
        <Typography>Aucune tâche</Typography>
      )}
    </Box>
  );
};

export default Tasks;
