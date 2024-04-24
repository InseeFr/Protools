import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Task from "../../../lib/model/tasks";
import UserCredentials from "../../../lib/model/userCredentials";

interface TasksManualProps {
  userActions: UserCredentials[];
  tasks: Task[];
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id UE",
    flex: 0.3,
    minWidth: 100,
    description: "Nom de la tâche",
  },
  {
    field: "idLogin",
    headerName: "Id connexion",
    flex: 0.3,
    minWidth: 200,
    description: "Identifiant de la tâche",
  },
  {
    field: "password",
    headerName: "Mot de passe",
    flex: 0.3,
    minWidth: 150,
  },
];

const columnsTasks: GridColDef[] = [
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
];
const TasksManual = (props: TasksManualProps) => {
  const { userActions, tasks } = props;
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
      {userActions.length === 0 ? (
        <Typography variant="body1">Aucune action utilisateur</Typography>
      ) : <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
          <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                inputProps: {
                  placeholder: "Recherche",
                },
              },
            },
          }}
          rows={userActions}
          columns={columns}
          autoHeight
          pagination
          getRowClassName={() => "row--style"}
        />
      </div>}

      {
        tasks.length > 0 && (
          <div style={{ margin: '5px 0' }}>
            <DataGrid
              rows={tasks}
              columns={columnsTasks}
              autoHeight
              pagination
              getRowClassName={() => "row--style"}
            />
          </div>
        )
      }
    </Box>
  );
};

export default TasksManual;
