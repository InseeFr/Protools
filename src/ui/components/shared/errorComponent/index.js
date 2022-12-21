import React from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
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
			padding: 10,
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
			textAlign: 'left',
		},
		errorContent: {
			fontWeight: 'normal',
			color: theme.palette.primary.main,
		},
	};
});

const ErrorComponent = (props) => {
	const error = props.error;
	const { classes } = useStyles();

	return (
		<>
			<CustomCard className={classes.card}>
				<CardContent>
					<Grid
						container
						spacing={2}
						justifyContent='center'
						alignItems='center'
					>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<Typography variant='h4' className={classes.titleCard}>
								Une erreur est survenue 😕 <br />
								Veuillez réessayer ultérieurement
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.gridItemProcessList}>
							<Typography variant='body2' className={classes.errorContent}>
								Erreur rencontrée: {error}. <br /> Vous pouvez essayer de
								contacter votre administrateur
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</CustomCard>
		</>
	);
};

export default ErrorComponent;
