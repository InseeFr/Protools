import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { HistoryProcess } from "../../../lib/model/api/historyProcess";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

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
        Identifiant
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.22,
  },
  {
    field: "startDate",
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
  {
    field: "ids",
    headerName: " ",
    headerClassName: "columns--header",
    flex: 0.08,
    align: "center",
    renderCell: (params: GridRenderCellParams) => {
      //console.log("params", params);
      return (
        <Link
          to={`/history/${params.row.id}/${params.row.processDefinitionId}`}
          style={{ textDecoration: "none" }}
        //state={{ ids: params.value }}
        >
          <FiChevronRight fontSize={24} />
        </Link>
      );
    }
  }
];
const HistoryProcessTable = (props: HistoryProcessTableProps) => {
  const { history } = props;
  console.log("history", history);
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
        initialState={{
          sorting: {
            sortModel: [{ field: "startTime", sort: "desc" }],
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        getRowClassName={() => "row--style"}
      />
    </Box>
  );
};

export default HistoryProcessTable;