
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Variable from "../../../lib/model/api/variable";

interface OtherVariableProps {
  variables: Variable[];
}
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nom",
    flex: 0.3,
    minWidth: 100,
    description: "Nom de la tâche",
  },
  {
    field: "value",
    headerName: "Valeur",
    flex: 0.4,
    minWidth: 200,
    description: "Identifiant de la tâche",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.1,

  },
  {
    field: "scope",
    headerName: "Scope",
    flex: 0.1,
  },
];
const OtherVariable = (props: OtherVariableProps) => {
  const { variables } = props;
  //console.log("variables", variables);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {variables.length > 0 ? (
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={variables}
          columns={columns}
          autoHeight
          pagination
          getRowClassName={() => "row--style"}
          getRowId={(row) => row.name}
        />
      ) : (
        <Typography>Aucune variable</Typography>
      )}
    </div>
  );
};

export default OtherVariable;