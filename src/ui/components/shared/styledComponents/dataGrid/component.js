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
		backgroundColor: theme.palette.secondary.pressed,
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
		borderRight: `1px solid ${'theme.palette.secondary.pressed'}`,
	},
	'& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
		borderBottom: `1px solid ${'theme.palette.secondary.pressed'}`,
	},
	'& .MuiDataGrid-cell': {
		fontSize: '0.845em',
		backgroundColor: theme.palette.secondary.pressed,
		padding: '3px 5px',
	},
	'& .MuiPaginationItem-root': {
		borderRadius: 0,
		textColor: theme.palette.primary.main,
	},
	'& .MuiPaginationItem-textPrimary.Mui-selected': {
		backgroundColor: theme.palette.primary.main,
	},
}));

export default StyledDataGrid;
