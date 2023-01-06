import React from 'react';
import { CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import CustomCard from '../styledComponents/card/card';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		card: {
			backgroundColor: theme.palette.secondary.card,
			padding: 15,
			width: '20%',
			marginLeft: '45%',
			marginTop: '10%',
			[theme.breakpoints.down('lg')]: {
				width: '32%',
				marginLeft: '40%',
			},
			[theme.breakpoints.down('md')]: {
				width: '32%',
				marginLeft: '38%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '87%',
				marginLeft: '5%',
			},
		},
		titleCard: {
			fontSize: 20,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		gridItemProcessList: {
			textAlign: 'center',
		},
		title: {
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		TitleHeader: {
			position: 'absolute',
			top: '2%',
			left: '19%',
			display: 'flex',
			alignItems: 'center',
		},
		logo: {
			verticalAlign: 'middle',
		},
		errorContent: {
			fontWeight: 'normal',
			color: theme.palette.primary.main,
		},
	};
});

const Loader = () => {
	const { classes } = useStyles();

	return (
		<>
			<CustomCard className={classes.card}>
				<CardContent>
					<Grid
						container
						spacing={3}
						justifyContent='center'
						alignItems='center'
					>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<LinearProgress sx={{ marginTop: 3 }} />
						</Grid>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<Typography variant='h4' className={classes.titleCard}>
								Chargement des données
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<Typography variant='subtitle' className={classes.errorContent}>
								Si le chargement prend trop de temps, veuillez contacter votre
								administrateur
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CustomCard>
		</>
	);
};

export default Loader;
