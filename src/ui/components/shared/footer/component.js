import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { Typography, Box, Link } from '@mui/material';

const useStyles = makeStyles()((theme) => {
	return {
		boxStyle: {
			marginLeft: '12%',
			marginTop: '2%',
			marginBottom: '2%',
			[theme.breakpoints.down('lg')]: {
				marginLeft: '16%',
			},
			[theme.breakpoints.down('md')]: {
				marginLeft: '10%',
			},
			[theme.breakpoints.down('sm')]: {
				marginLeft: '3%',
			},
		},
	};
});
const Copyright = () => {
	return (
		<Typography
			variant='caption'
			display='block'
			align='center'
			color='primary'
			fontWeight={'normal'}
		>
			<Link
				color='inherit'
				href='https://github.com/InseeFr/Protools-Back-Office'
			>
				Source Code
			</Link>
			{' - '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

const Footer = () => {
	const { classes } = useStyles();
	return (
		<Box component='footer' className={classes.boxStyle}>
			<Typography
				variant='overline'
				display='block'
				align='center'
				color='primary'
			>
				Protools - Survey Orchestrator & Management Tool
			</Typography>{' '}
			<Copyright />
		</Box>
	);
};

export default Footer;
