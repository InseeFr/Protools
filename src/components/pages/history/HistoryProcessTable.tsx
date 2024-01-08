import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";

interface HistoryProcessTableProps {
  history: HistoryProcess[];
}
const columns: GridColDef[] = [
  {
    field: "processDefinitionId",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Id
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.35,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: "businessKey",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Type
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.22,
  },
  {
    field: "startTime",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de lancement
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.2,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{moment(params.value).format("DD/MM/YYYY HH:mm")}</Typography>
    ),
  },
  {
    field: "endTime",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de fin
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.2,
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
    flex: 0.08,
    renderCell: (params: GridRenderCellParams) => {
      const duration = moment.duration(params.value);
      const formattedDuration = `${Math.floor(duration.asHours())} h`;
      return <Typography>{formattedDuration}</Typography>;
    },
  },
];
const HistoryProcessTable = (props: HistoryProcessTableProps) => {
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
        initialState={{
          sorting: {
            sortModel: [{ field: "startTime", sort: "desc" }],
          },
        }}
        getRowClassName={() => "row--style"}
      />
    </Box>
  );
};

export default HistoryProcessTable;