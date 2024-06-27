import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { frFR } from "@mui/x-data-grid/locales";
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
    field: "businessKey",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Identifiant
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography align="left">{params.value}</Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.16,
  },
  // {
  //   field: "processDefinitionId",
  //   renderHeader: () => (
  //     <Typography variant="h6" fontWeight={600}>
  //       Id
  //     </Typography>
  //   ),
  //   headerClassName: "columns--header",
  //   flex: 0.35,
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Typography>{params.value}</Typography>
  //   ),
  // },
  {
    field: "processDefinitionName",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Modèle de processus
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.35,
    renderCell: (params: GridRenderCellParams) => (
      <Typography align="left">{params.value}</Typography>
    ),
  },
  {
    field: "startDate",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Début
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.15,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>
        {params.value < 60
          ? `${params.value} sec`
          : params.value < 3600
            ? `${Math.floor(params.value / 60)} min`
            : moment(params.value).format("DD/MM/YYYY HH:mm")}
      </Typography>
    ),
  },
  {
    field: "endTime",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Fin
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.15,
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
    flex: 0.06,
    renderCell: (params: GridRenderCellParams) => {
      const duration = moment.duration(params.value);
      let formattedDuration = "";

      if (duration.asHours() < 1) {
        if (duration.asMinutes() < 1) {
          formattedDuration = `${Math.floor(duration.asSeconds())} sec`;
        } else {
          formattedDuration = `${Math.floor(duration.asMinutes())} min`;
        }
      } else {
        formattedDuration = `${Math.floor(duration.asHours())} h`;
      }

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
    },
  },
];
const HistoryProcessTable = (props: HistoryProcessTableProps) => {
  const { history } = props;
  //console.log("history", history);
  return (
    <Box
      sx={{
        width: "120%",
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
        getRowHeight={() => "auto"}
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
            sortModel: [{ field: "endTime", sort: "desc" }],
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        getRowClassName={() => "row--style"}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};

export default HistoryProcessTable;
