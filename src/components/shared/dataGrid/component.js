import {
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import StyledDataGrid from '../styledComponents/dataGrid/component';
import { Box } from '@mui/material';

const CustomToolbar = () => {
	return (
		<GridToolbarContainer>
			<GridToolbarFilterButton />
			<GridToolbarExport printOptions={{ disableToolbarButton: true }} />
		</GridToolbarContainer>
	);
};

const CustomDataGrid = (props) => {
	const rows = props.rows;
	const height = parseInt(props.height);
	const columns = props.columns;
	return (
		<Box
			sx={{
				height: { height },
				width: '100%',
				'& .columns--header': {
					fontWeight: '700',
				},
			}}
		>
			<StyledDataGrid
				components={{
					Toolbar: CustomToolbar,
				}}
				localeText={{
					toolbarFilters: 'Filtres',
					toolbarExport: 'Export',
				}}
				rows={rows}
				columns={columns}
				height={height}
				autoPageSize
				//pagination
				//getRowHeight={() => 'auto'}
				initialState={{
					pagination: {
						page: 0,
					},
				}}
				getRowClassName={() => 'row--style'}
				disableSelectionOnClick
			/>
		</Box>
	);
};

export default CustomDataGrid;
