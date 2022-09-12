/* eslint-disable no-unused-vars */
import logoProtools from 'assets/logoProtools.svg';
import { makeStyles } from 'tss-react/mui';
import { Box } from '@mui/material';

export default function Logo() {
	return (
		<Box
			component='img'
			sx={{
				width: {
					xs: 31, // theme.breakpoints.up('xs')
					sm: 35, // theme.breakpoints.up('sm')
					md: 40, // theme.breakpoints.up('md')
					lg: 45, // theme.breakpoints.up('lg')
					xl: 50, // theme.breakpoints.up('xl')
				},
			}}
			src={logoProtools}
			alt='Protools Logo'
		/>
	);
}
