import React from 'react';

import { makeStyles } from 'tss-react/mui';
import {
	Button,
	Card,
	Typography,
	Grid,
	Stack,
	CardContent,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';

import { FiActivity, FiCodesandbox } from 'react-icons/fi';

const useStyles = makeStyles()((theme) => {
	return {
		infoName: {
			fontWeight: 'bold',
		},
		infoValue: {},
	};
});

const ProtocolInfo = (props) => {
	const classes = useStyles();
	const data = props.processInfo;

	return (
		<>
			<Stack direction='row' alignItems='flex-start'>
				<Card
					sx={{
						boxShadow: 0,
						textAlign: 'center',
						backgroundColor: 'secondary.pressed',
						borderRadius: 7,
						m: 1,
						width: '90%',
					}}
				>
					<CardContent className={classes.cardContent}>
						<Stack
							direction='row'
							alignItems='flex-start'
							spacing={{ xl: 10, md: 6, lg: 5, xs: 0.5, sm: 1.5 }}
						>
							<Stack spacing={1}>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Clé de l'enquête:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{Object.keys(data)[0]}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Nom de l'enquête:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{Object.entries(data)[0][1].title}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Description:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										align='left'
										sx={{ marginLeft: 1 }}
									>
										{Object.entries(data)[0][1].description}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Variables de Contexte:
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<List
										key={Object.entries(data)[0][1].variables}
										disablePadding
									>
										{Object.entries(data)[0][1].variables.map((item) => (
											<ListItem
												key={item.nom}
												sx={{
													paddingTop: '0',
													paddingBottom: '0',
													display: 'list-item',
												}}
											>
												<ListItemText
													primary={
														<Typography
															color='primary'
															variant='subtitle1'
															fontWeight='bold'
															className={classes.infoName}
														>
															{'\u2022'}
															{' ' + item.nom + ':'}
														</Typography>
													}
													secondary={
														<Typography
															color='primary'
															variant='body2'
															className={classes.infoName}
														>
															{item.description}
														</Typography>
													}
												/>
											</ListItem>
										))}
									</List>
								</Grid>
							</Stack>
							<Stack spacing={1}>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Nombre de tâches manuelles:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										.{Object.entries(data)[0][1].tachesManu}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Autre info:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										align='left'
										sx={{ marginLeft: 1 }}
									>
										Autres informations potentiellement utiles potentiellement
										longues à afficher
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										....
									</Typography>
								</Grid>
							</Stack>
						</Stack>
					</CardContent>
				</Card>
				<Stack spacing={1.5} sx={{ padding: '0.2rem 2.8rem', minwidth: '15%' }}>
					<Typography
						color='primary'
						variant='h6'
						sx={{ marginTop: 1 }}
						className={classes.infoName}
					>
						Plus d'informations:
					</Typography>
					<Button
						variant='outlined'
						color='primary'
						startIcon={<FiCodesandbox />}
						sx={{ padding: '0.5rem 0.7rem' }}
					>
						More Info #1
					</Button>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<FiActivity />}
						sx={{ padding: '0.5rem 0.7rem', color: 'white' }}
					>
						More Info #2
					</Button>
				</Stack>
			</Stack>
		</>
	);
};

export default ProtocolInfo;
