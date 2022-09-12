import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Card,
	Typography,
	Grid,
	Stack,
	CardContent,
} from '@mui/material';
import { FiPause, FiTrash, FiPlay } from 'react-icons/fi';
import {
	deleteProcess,
	suspendProcess,
	relaunchProcess,
} from '../../../utils/dataProcess/processExecution';

const useStyles = makeStyles()((theme) => {
	return {
		infoName: {
			fontWeight: 'bold',
		},
		infoValue: {},
	};
});

const ProcessGlobalInfo = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const {
		date,
		processID,
		documentation,
		//tenant,
		activeTask,
		processKey,
		businessKey,
		state,
	} = props;

	const [openDelete, setOpenDelete] = useState(false);
	const [openSuspend, setOpenSuspend] = useState(false);

	const handleSuspendClickOpen = () => {
		setOpenSuspend(true);
	};

	const handleSuspendCloseCancel = () => {
		setOpenSuspend(false);
	};
	const handleSuspendCloseConfirm = () => {
		setOpenSuspend(false);
		state ? suspendProcess(processID) : relaunchProcess(processID);
		navigate(-1);
	};

	const handleDeleteClickOpen = () => {
		setOpenDelete(true);
	};

	const handleDeleteCloseCancel = () => {
		setOpenDelete(false);
	};
	const handleDeleteCloseConfirm = () => {
		setOpenDelete(false);
		deleteProcess(processID);
		navigate(-1);
	};
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
										Documentation:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
										align='left'
									>
										{documentation}
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
										{businessKey}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Type d'enquête:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{processKey}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										ProcessID:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{processID}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Groupe habilité:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										...
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Tâches manuelles en attente:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{activeTask}
									</Typography>
								</Grid>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										Date de création:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{date}
									</Typography>
								</Grid>
							</Stack>
							<Stack spacing={1}>
								<Grid item container xs={12} direction='row'>
									<Typography
										color='primary'
										variant='h6'
										className={classes.infoName}
									>
										État:
									</Typography>
									<Typography
										color='primary'
										variant='body2'
										sx={{ marginLeft: 1 }}
									>
										{state ? 'Actif' : 'Inactif'}
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
						Actions:
					</Typography>
					<Button
						variant='outlined'
						color='primary'
						startIcon={state ? <FiPause /> : <FiPlay />}
						sx={{ padding: '0.5rem 0.7rem' }}
						onClick={handleSuspendClickOpen}
					>
						{state ? 'Suspendre' : 'Relancer'}
					</Button>
					<Button
						variant='contained'
						color='warning'
						startIcon={<FiTrash />}
						onClick={handleDeleteClickOpen}
						sx={{ padding: '0.5rem 0.7rem' }}
					>
						Supprimer
					</Button>
				</Stack>
			</Stack>

			<Dialog open={openDelete} onClose={handleDeleteCloseCancel}>
				<DialogTitle>
					<Typography variant='h4'>Supprimer un processus</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Voulez vous vraiment supprimer ce processus ? Cette action est
						irréversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleDeleteCloseCancel}
						autoFocus
					>
						Annuler
					</Button>
					<Button
						variant='contained'
						elevation={0}
						onClick={handleDeleteCloseConfirm}
						autoFocus
					>
						Confirmer
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openSuspend} onClose={handleSuspendCloseCancel}>
				<DialogTitle>
					<Typography variant='h4'>
						{state ? 'Suspendre un processus' : 'Relancer un processus'}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{state
							? 'Voulez vous vraiment suspendre ce processus ? Cela suspendra également les évenements associés tels que les timers'
							: 'Voulez vous relancer ce processus suspendu ?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleSuspendCloseCancel}
						autoFocus
					>
						Annuler
					</Button>
					<Button
						variant='contained'
						elevation={0}
						onClick={handleSuspendCloseConfirm}
						autoFocus
					>
						Confirmer
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProcessGlobalInfo;
