import React from 'react';

//import Display from './bpmnDisplay';
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import { Grid, CardContent, Box, Typography } from '@mui/material';
import SelectProcess from './selectProcess';
import CustomCard from 'components/shared/styledComponents/card/card';
import Logo from 'components/shared/logo/logo';
import SideBar from '../../shared/sidepanel/sidepanel';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		card: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '20%',
			marginLeft: '45%',
			marginTop: '10%',
			padding: 10,
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
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
	};
});

const ProcessSelect = () => {
	const { classes } = useStyles();

	return (
		<>
			<GlobalStyles
				styles={{
					body: {
						backgroundColor: '#F9FAFC',
					},
				}}
			/>
			<SideBar page='process' />
			<Grid container justify='center'>
				<Box className={classes.TitleHeader}>
					<Logo className={classes.logo} />
					<Typography variant='h3' className={classes.title}>
						Workflows
					</Typography>
				</Box>
				<CustomCard className={classes.card}>
					<CardContent>
						<Typography variant='h4' className={classes.titleCard}>
							Sélectionner l'enquête à lancer :
						</Typography>
						<SelectProcess />
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};
export default ProcessSelect;
