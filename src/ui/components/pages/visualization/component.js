import React from 'react';

//import Display from './bpmnDisplay';
import { makeStyles } from 'tss-react/mui';
import { Grid, CardContent, Box, Typography } from '@mui/material';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import Logo from 'ui/components/shared/logo/logo';
import SideBar from '../../shared/sidepanel/sidepanel';
import SelectProtocol from './selectProtocol';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		card: {
			backgroundColor: theme.palette.secondary.card,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '20%',
			marginLeft: '45%',
			marginTop: '10%',
			padding: 10,
			[theme.breakpoints.down('lg')]: {
				width: '30%',
				marginLeft: '40%',
			},
			[theme.breakpoints.down('md')]: {
				width: '30%',
				marginLeft: '38%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '85%',
				marginLeft: '5%',
			},
		},
		title: {
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		TitleHeader: {
			position: 'absolute',
			top: '3%',
			left: '17%',
			display: 'flex',
			alignItems: 'center',
		},
		logo: {
			verticalAlign: 'middle',
		},
		titleCard: {
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
	};
});

const Visualizer = () => {
	const { classes } = useStyles();
	return (
		<>
			<SideBar page='design' />
			<Grid container justify='center'>
				<Box className={classes.TitleHeader}>
					<Logo className={classes.logo} />
					<Typography variant='h3' className={classes.title}>
						Visualisation Protocoles
					</Typography>
				</Box>
				<CustomCard className={classes.card}>
					<CardContent>
						<Typography variant='h4' className={classes.titleCard}>
							Sélectionner un protocole type:
						</Typography>
						<SelectProtocol />
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};
export default Visualizer;
