import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FiChevronRight } from 'react-icons/fi';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ProcessInfo from '../../../lib/model/processInfo';

interface OnGoingProcessProps {
  processes: ProcessInfo[];
}
const columns: GridColDef[] = [
  {
    field: 'processKey',
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Nom
      </Typography>
    ),
    headerClassName: 'columns--header',
    flex: 0.15,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: 'businessKey',
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Type
      </Typography>
    ),
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
    headerClassName: 'columns--header',
    flex: 0.15,
  },
  {
    field: 'documentation',
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Description
      </Typography>
    ),
    headerClassName: 'columns--header',
    flex: 0.4,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{params.value}</Typography>
    ),
  },
  {
    field: 'startDate',
    renderHeader: () => (
      <Typography variant="h6" fontWeight={600}>
        Date de lancement
      </Typography>
    ),
    type: 'date',

    headerClassName: 'columns--header',
    flex: 0.18,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>{moment(params.value).format('DD/MM/YYYY HH:mm')}</Typography>
    ),
  },
  {
    field: 'other',
    headerName: ' ',
    headerClassName: 'columns--header',
    flex: 0.1,
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Link
        to={`/visualize/${params.value}`}
        style={{ textDecoration: 'none' }}
        state={{ processInfo: params.value }}
      >
        <FiChevronRight fontSize={21} />
      </Link>
    ),
  },
];
const OnGoingProcess = (props: OnGoingProcessProps) => {
  const { processes } = props;
  console.log(processes);
  return (
    <Box
      sx={{
        width: '100%',
        '& .columns--header': {
          fontWeight: '700',
        },
        p: 2,
      }}
    >
      <DataGrid
        rows={processes}
        columns={columns}
        autoHeight
        pagination
        getRowClassName={() => 'row--style'}
      />
    </Box>
  );
};

export default OnGoingProcess;
