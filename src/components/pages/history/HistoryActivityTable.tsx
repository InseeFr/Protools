import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import HistoricActivity from "../../../lib/model/api/historicActivity";

interface HistoryActivityTableProps {
  history: HistoricActivity[];
}
const columns: GridColDef[] = [
  {
    field: "activityName",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Nom
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.2,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: "activityType",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Type
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.1,
  },
  {
    field: "processInstanceId",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Processus Associé
      </Typography>
    ),

    headerClassName: "columns--header",
    flex: 0.25,
  },
  {
    field: "finished",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de fin
      </Typography>
    ),
    type: "boolean",

    headerClassName: "columns--header",
    flex: 0.18,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value.toString()}</Typography>
    ),
  },
];
const HistoryActivityTable = (props: HistoryActivityTableProps) => {
  const { history } = props;
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
      <DataGrid
        rows={history}
        columns={columns}
        autoHeight
        pagination
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        getRowClassName={() => "row--style"}
      />
    </Box>
  );
};

export default HistoryActivityTable;
