import { styled } from '@mui/system';
import { Tab, Tabs } from '@mui/material';

export const StyledTabs = styled(Tabs)(({ theme }) => ({
	borderBottom: null,
	'& .MuiTabs-selected': {
		backgroundColor: theme.palette.secondary.main,
	},
	'& .MuiTabs-indicator': {
		backgroundColor: theme.palette.secondary.main,
	},
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
	fontWeight: 'bold',
	opacity: 0.5,
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
	'&.MuiButtonBase-root': {
		fontSize: '1rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.6rem',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '0.9rem',
		},
	},
	'&.MuiTab-root': {
		fontWeight: '600',
		minWidth: '100px',
	},
	'&:hover': {
		color: theme.palette.primary.main,
		opacity: 0.9,
	},
	'&.Mui-selected': {
		color: theme.palette.primary.main,
		fontWeight: 'bold',
		opacity: 1,
	},
	'&.Mui-focusVisible': {
		backgroundColor: theme.white,
	},
}));
