import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { Box, Typography } from "@mui/material";
import Task from "../../../lib/model/tasks";

interface TasksManualProps {
  tasks: Task[];
}

const columns: GridColDef[] = [
  {
    field: "label",
    headerName: "Nom",
    flex: 0.3,
    minWidth: 100,
    description: "Nom de la tâche",
  },
  {
    field: "id",
    headerName: "Task ID",
    flex: 0.3,
    minWidth: 200,
    description: "Identifiant de la tâche",
  },
  {
    field: "description",
    headerName: "Date de création",
    flex: 0.5,
    minWidth: 150,
  },
  {
    field: "key",
    headerName: " ",
    align: "center",
    flex: 0.1,
    minWidth: 90,
    description: "Exécuter cett tâche",
    renderCell: (params: GridRenderCellParams) => (
      //console.log("params", params),
      <Link
        to={{
          pathname: `/upload-context/${params.row.id}`,
        }}
      >
        <FiUserPlus />
      </Link>
    ),
  },
];
const TasksManual = (props: TasksManualProps) => {
  const { tasks } = props;
  return (
    <Box
      sx={{
        width: "100%",
        "& .columns--header": {
          fontWeight: "700",
        },
        p: 2,
      }}
    >
      {tasks.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <DataGrid
            rows={tasks}
            columns={columns}
            autoHeight
            pagination
            getRowClassName={() => "row--style"}
          />
        </div>
      )}
      {tasks.length === 0 && (
        <Typography variant="body1">Aucune action utilisateur</Typography>
      )}
    </Box>
  );
};

export default TasksManual;
