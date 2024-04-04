import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface BpmnElementsProps {
  elements: BpmnElements[];
}

const columns: GridColDef[] = [
  {
    field: "label",
    headerName: "Nom",
    flex: 0.3,
    minWidth: 100,
    description: "Nom de l'élement",
  },
  {
    field: "id",
    headerName: "Task ID",
    flex: 0.3,
    minWidth: 200,
    description: "Identifiant de l'élement",
  },
  {
    field: "description",
    headerName: "Date de création",
    flex: 0.5,
    minWidth: 150,
  },
];
const BpmnElements = (props: BpmnElementsProps) => {
  const { elements } = props;
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <DataGrid
          rows={elements}
          columns={columns}
          autoHeight
          pagination
          getRowClassName={() => "row--style"}
        />
      </div>
    </Box>
  );
};

export default BpmnElements;
