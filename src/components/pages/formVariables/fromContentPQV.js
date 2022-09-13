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
	Select,
	MenuItem,
	InputLabel,
	RadioGroup,
	Radio,
	FormControlLabel,
} from '@mui/material';
import { temporaryExecuteTask } from 'utils/dataProcess/processExecution';

const getVariablesObject = (variables) => {
	const variablesObject = {};
	for (let i = 0; i < variables.length; i++) {
		variablesObject[variables[i].name] = variables[i].value;
	}
	return variablesObject;
};

const FormContentPQV = (props) => {
	const taskName = props.taskName;
	const taskID = props.taskID;
	const variables = getVariablesObject(props.variables);
	console.log('variables finales: ', variables);
	const [selected, setSelected] = useState(true);

	const handleChange = (event) => {
		console.log('event: ' + event.target.value);
		setSelected(event.target.value);
	};

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
		temporaryExecuteTask(taskID, { surveyValid: selected });
		handleClickOpen();
	};

	return (
		<>
			<FormControl fullWidth sx={{ marginTop: 3 }}>
				<Stack spacing={3}>
					<TextField
						required
						label='Survey Name (Required)'
						value={variables.name}
						inputProps={{ readOnly: true }}
						variant='filled'
						fullwidth
					/>
					<TextField
						label="Date du début d'enquête"
						inputFormat='dd/MM/yyyy'
						value={variables.dateDeb}
						inputProps={{ readOnly: true }}
						variant='filled'
						fullwidth
					/>
					<TextField
						label="Date de fin d'enquête"
						inputFormat='dd/MM/yyyy'
						value={variables.dateEnd}
						inputProps={{ readOnly: true }}
						variant='filled'
						fullwidth
					/>
					<TextField
						required
						type='text'
						variant='filled'
						inputProps={{
							inputMode: 'numeric',
							pattern: '/^-?d+(?:.d+)?$/g',
							readOnly: true,
						}}
						label='Sample Size (Required)'
						value={variables.sampleSize}
						fullwidth
					/>
					<RadioGroup
						row
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'
						onChange={handleChange}
					>
						<FormControlLabel value={true} control={<Radio />} label='Oui' />
						<FormControlLabel value={false} control={<Radio />} label='Non' />
					</RadioGroup>
					<Button variant='contained' sx={{ m: 2 }} onClick={handleSubmit}>
						<Typography value='h2'>Envoyer</Typography>
					</Button>
				</Stack>
			</FormControl>

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

export default FormContentPQV;
