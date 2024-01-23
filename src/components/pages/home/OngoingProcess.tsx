import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FiChevronRight } from "react-icons/fi";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import ProcessInfo from "../../../lib/model/processInfo";

interface OnGoingProcessProps {
  processes: ProcessInfo[];
}
const columns: GridColDef[] = [
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
    flex: 0.15,
  },
  {
    field: "processKey",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Nom
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.35,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: "documentation",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Description
      </Typography>
    ),
    headerClassName: "columns--header",
    flex: 0.2,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: "startDate",
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de lancement
      </Typography>
    ),
    type: "date",

    headerClassName: "columns--header",
    flex: 0.18,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{moment(params.value).format("DD/MM/YYYY HH:mm")}</Typography>
    ),
  },
  {
    field: "ids",
    headerName: " ",
    headerClassName: "columns--header",
    flex: 0.1,
    align: "center",
    renderCell: (params: GridRenderCellParams) => (
      <Link
        to={`/visualize/${params.value.id}/${params.value.processDefinitionId}`}
        style={{ textDecoration: "none" }}
        //state={{ ids: params.value }}
      >
        <FiChevronRight fontSize={21} />
      </Link>
    ),
  },
];
const OnGoingProcess = (props: OnGoingProcessProps) => {
  const { processes } = props;
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
        rows={processes}
        columns={columns}
        getRowClassName={() => "row--style"}
        disableColumnFilter
        disableColumnSelector
        paginationMode="server"
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
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

export default OnGoingProcess;
