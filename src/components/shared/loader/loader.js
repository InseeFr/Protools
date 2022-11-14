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
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '25%',
			marginLeft: '45%',
			marginTop: '15%',
			[theme.breakpoints.down('md')]: {
				width: '40%',
				marginLeft: '30%',
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
						spacing={5}
						justifyContent='center'
						alignItems='center'
					>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<LinearProgress sx={{ marginTop: 2 }} />
						</Grid>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<Typography variant='h4' className={classes.titleCard}>
								Chargement des données
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CustomCard>
		</>
	);
};

export default Loader;
