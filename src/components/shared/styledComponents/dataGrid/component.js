import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	border: 0,
	color: theme.palette.primary.main,
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	WebkitFontSmoothing: 'auto',
	letterSpacing: 'normal',
	'& .MuiDataGrid-columnsContainer': {
		backgroundColor: '#fafafa',
	},
	'& .MuiDataGrid-toolbarContainer': {
		'& .MuiButtonBase-root': {
			margin: '0px 5px',
		},
	},
	'& .MuiDataGrid-iconSeparator': {
		display: 'none',
	},
	'& .MuiDataGrid-columnHeaderTitle': {
		fontWeight: '600',
	},
	'& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
		borderRight: `1px solid ${'#f0f0f0'}`,
	},
	'& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
		borderBottom: `1px solid ${'#f0f0f0'}`,
	},
	'& .MuiDataGrid-cell': {
		color: 'rgba(0,0,0,.85)',
		fontSize: '0.845em',
		backgroundColor: theme.palette.secondary.pressed,
		padding: '3px 5px',
	},
	'& .MuiPaginationItem-root': {
		borderRadius: 0,
	},
}));

export default StyledDataGrid;
