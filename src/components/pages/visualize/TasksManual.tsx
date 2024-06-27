import { DataGrid, frFR, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Task from "../../../lib/model/displayModels/tasks";
import UserCredentials from "../../../lib/model/displayModels/userCredentials";
import { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import AddContextDialog from "../../shared/dialogs/AddContext";

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
  const [exportState, setExportState] = useState(false);
  const [uploadState, setUploadState] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          "& .columns--header": {
            fontWeight: "700",
          },
          //p: 2,
        }}
      >
        {userActions.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100%",
            }}
          >
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <Button
                priority="primary"
                onClick={() => setExportState(!exportState)}
              >
                Récupérer les comptes de connexion
              </Button>
            </Box>
          </div>
        )}

        {exportState && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              margin: "2px 0",
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
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              getRowClassName={() => "row--style"}
            />
          </div>
        )}

        {tasks.length > 0 && (
          <div style={{ margin: "5px 0" }}>
            <Typography variant="h6">Liste des tâches</Typography>
            <DataGrid
              rows={tasks}
              columns={columnsTasks}
              autoHeight
              pagination
              getRowClassName={() => "row--style"}
            />
          </div>
        )}
        {tasks.length === 0 && userActions.length === 0 && (
          <Typography>Aucune tâche</Typography>
        )}
      </Box>
      <AddContextDialog
        uploadContext={uploadState}
        setUploadContext={setUploadState}
      />
    </>
  );
};

export default TasksManual;
