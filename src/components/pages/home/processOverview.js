import React from 'react';
import { Grid, CardContent, Typography, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CustomCard from '../../shared/styledComponents/card/card';
import { makeStyles } from 'tss-react/mui';
import { ErrorBoundary } from 'react-error-boundary';
//import { IncidentChartdata } from 'utils/mockData';
import DoughnutChart from './donutChart';

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
			width: '80%',
			marginLeft: '17%',
			marginTop: '2.5%',
			[theme.breakpoints.down('md')]: {
				width: '85%',
				marginLeft: '11.5%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				marginLeft: '5%',
			},
		},
		titleCard: {
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
	};
});

const ProcessOverview = (props) => {
	const pieProcessdata = props.pieProcessdata;
	const pieTaskdata = props.pieTaskdata;
	const pieIncidentdata = props.pieIncidentdata;
	const { classes } = useStyles();
	const small = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<CustomCard className={classes.card}>
			<ErrorBoundary
				fallback={
					<Typography variant={'body1'}>Could not fetch data</Typography>
				}
			>
				<CardContent>
					<Stack
						direction='row'
						alignItems='center'
						spacing={{ xs: 2, sm: 6, md: 12, lg: 15, xl: 20 }}
					>
						<Grid
							item
							container
							xs={3}
							sx={{
								flexDirection: 'column',
								textAlign: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography
								variant={small ? 'body2' : 'body1'}
								className={classes.titleCard}
							>
								Enquêtes en cours
							</Typography>
							<DoughnutChart data={pieProcessdata} redraw />
						</Grid>
						<Grid
							item
							xs={6}
							sx={{
								flexDirection: 'column',
								textAlign: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography
								variant={small ? 'body2' : 'body1'}
								className={classes.titleCard}
							>
								Tâches manuelles
							</Typography>
							<DoughnutChart data={pieTaskdata} redraw />
						</Grid>
						<Grid
							item
							xs={3}
							sx={{
								flexDirection: 'column',
								textAlign: 'center',
								alignContent: 'center',
								alignItems: 'center',
							}}
						>
							<Typography
								variant={small ? 'body2' : 'body1'}
								className={classes.titleCard}
							>
								Incidents en cours
							</Typography>
							<DoughnutChart data={pieIncidentdata} redraw />
						</Grid>
					</Stack>
				</CardContent>
			</ErrorBoundary>
		</CustomCard>
	);
};

export default ProcessOverview;
