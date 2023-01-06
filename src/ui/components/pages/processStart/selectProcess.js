import React, { useState } from 'react';
import {
	FormControl,
	Select,
	MenuItem,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Stack,
	InputLabel,
	Typography,
} from '@mui/material';
import { startProcess } from 'core/utils/dataProcess/processExecution';
import { useNavigate } from 'react-router-dom';

const SelectProcess = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState('EnqueteWebContinue');
	const [selectedKey, setSelectedKey] = useState('Test');
	const [open, setOpen] = useState(false);
	const [processParams, setProcessParams] = useState([]);

	const getProcessKey = (selected, callback) => {
		switch (selected) {
			case 'ProcessTestFeature':
				return ['ProcessTestFeature', {}];
			case 'EnqueteWebContinue':
				return ['EnqueteWebContinue', {}];
			default:
				console.log('Error: BPMN file not found');
		}
		callback();
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		navigate('/');
	};
	const handleChange = (event) => {
		console.log('event: ' + event.target.value);
		setSelected(event.target.value);
	};
	const handleChangeKey = (event) => {
		console.log('event: ' + event.target.value);
		setSelectedKey(event.target.value);
	};

	const navigationHandler = () => {
		console.log('Selected survey: ' + selected);
		const processInfo = getProcessKey(selected);
		setProcessParams(startProcess(processInfo[0], selectedKey, processInfo[1]));

		console.log('processParams: ' + processParams);
		handleClickOpen();
	};

	return (
		<>
			<Stack spacing={3}>
				<FormControl
					color='primary'
					size='small'
					fullWidth
					sx={{ marginTop: 3 }}
				>
					<InputLabel> Nom d'enquête :</InputLabel>
					<Select
						color='primary'
						labelId='SelectBPMN'
						value={selected}
						label='Select BPMN'
						onChange={handleChange}
					>
						<MenuItem value={'EnqueteWebContinue'}>
							Enquête Web Continue
						</MenuItem>
						<MenuItem value={'ProcessTestFeature'}>
							Enquête de Test {'(expérimental)'}
						</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
					<InputLabel color='primary'>Type de processus :</InputLabel>
					<Select
						color='primary'
						labelId='SelectBusinessKey'
						value={selectedKey}
						label='Select BusinessKey'
						onChange={handleChangeKey}
					>
						<MenuItem value={'Fam'}>Enquête Famille 2022</MenuItem>
						<MenuItem value={'Test'}>Test Features</MenuItem>
					</Select>
				</FormControl>
				<Button variant='contained' onClick={navigationHandler}>
					Valider
				</Button>
			</Stack>

			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<DialogTitle>
					<Typography variant='h4'>Process Service</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Commande lancée avec succès, redirection vers la page d'accueil.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='outlined' onClick={handleClose} autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SelectProcess;
