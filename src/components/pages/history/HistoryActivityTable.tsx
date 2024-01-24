import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import HistoricActivity from "../../../lib/model/api/historicActivity";
import moment from "moment";

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
    flex: 0.4,
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
    field: "executionId",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Processus Associé
      </Typography>
    ),

    headerClassName: "columns--header",
    flex: 0.25,
  },
  {
    field: "endTime",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de fin
      </Typography>
    ),

    headerClassName: "columns--header",
    flex: 0.12,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{moment(params.value).format("DD/MM/YYYY HH:mm")}</Typography>
    ),
  },
  {
    field: "durationInMillis",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Durée
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.1,
    renderCell: (params: GridRenderCellParams) => {
      const duration = moment.duration(params.value);
      const formattedDuration = `${Math.floor(duration.asMilliseconds())} ms`;
      return <Typography>{formattedDuration}</Typography>;
    },
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
        getRowId={(row) => {
          return row.activityId + row.endTime;
        }}
        columns={columns}
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
        initialState={{
          sorting: {
            sortModel: [{ field: "startTime", sort: "desc" }],
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default HistoryActivityTable;
