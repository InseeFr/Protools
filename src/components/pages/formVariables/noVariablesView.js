/* eslint-disable no-unused-vars */
import React, { useState, useParams } from 'react';
import {
	Typography,
	FormControl,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	TextField,
	Stack,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { temporaryExecuteTask } from 'utils/dataProcess/processExecution';
const useStyles = makeStyles()((theme) => {
	return {
		titleCard: {
			marginTop: 2,
			color: theme.palette.primary.main,
		},
	};
});
const NoVariablesViews = (props) => {
	const classes = useStyles();
	const taskID = props.taskID;

	console.log('taskID execution :', taskID);

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		window.location.replace('/ ', '_blank');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		temporaryExecuteTask(taskID, {});
		handleClickOpen();
	};

	return (
		<>
			<Typography value='h3' sx={{ marginTop: 1, color: 'primary.main' }}>
				Cette tâche ne requiert pas de variables, il n'y a donc pas de
				formulaire à remplir.
			</Typography>
			<Button variant='contained' sx={{ marginTop: 2 }} onClick={handleSubmit}>
				<Typography value='h4'>Envoyer</Typography>
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h4'>Task Service</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Tâche exécutée avec succès, retour au menu principal.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={handleClose} autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default NoVariablesViews;
