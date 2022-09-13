/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
	Typography,
	FormControl,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Stack,
	TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { temporaryExecuteTask } from 'utils/dataProcess/processExecution';

const FormComponent = (props) => {
	const navigate = useNavigate();

	const taskID = props.taskID;
	const [dateDeb, setDateDeb] = useState(new Date('2022-01-01T21:11:54'));
	const [dateDebError, setDateDebError] = useState('');
	const [dateEnd, setDateEnd] = useState(new Date('2022-12-31T21:11:54'));
	const [name, setName] = useState('');
	const [nameError, setNameError] = useState('');
	const [sampleSize, setSampleSize] = useState(5);
	const [sampleSizeError, setSampleSizeError] = useState('');
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!dateDeb) {
			setDateDebError('Selectionez une date de début');
			console.log('error on dateDeb');
		} else {
			setDateDebError('');
		}
		if (!sampleSize) {
			setSampleSizeError("Selectionez une taille de l'échantillon");
			console.log('error on sampleSize');
		} else {
			setSampleSizeError('');
		}

		if (name.length === 0) {
			setNameError("Saisissez un nom de d'enquête");
			console.log('error on name');
		} else {
			setNameError('');
		}
		if (
			dateDebError.length === 0 &&
			sampleSizeError.length === 0 &&
			nameError.length === 0
		) {
			console.log('Variables submit');
			var obj = {};
			obj.name = name;
			obj.dateDeb = dateDeb.toDateString();
			obj.dateEnd = dateEnd.toDateString();
			obj.sampleSize = sampleSize.toString();
			obj.state_survey = 'notReady';
			obj.idSurvey = '0';
			temporaryExecuteTask(taskID, obj);
			handleClickOpen();
		} else {
			console.log('Error on variables');
		}
	};

	return (
		<>
			<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack spacing={3}>
						<TextField
							required
							size='small'
							label='Survey Name (Required)'
							value={name}
							error={!!nameError}
							helperText={nameError}
							onChange={(event) => setName(event.target.value)}
						/>
						<DesktopDatePicker
							label='Date Début'
							inputFormat='dd/MM/yyyy'
							value={dateDeb}
							onChange={(value) => setDateDeb(value)}
							renderInput={(params) => <TextField size='small' {...params} />}
						/>
						<DesktopDatePicker
							label='Date Fin'
							inputFormat='dd/MM/yyyy'
							value={dateEnd}
							onChange={(value) => setDateEnd(value)}
							renderInput={(params) => <TextField size='small' {...params} />}
						/>
						<TextField
							size='small'
							required
							type='text'
							inputProps={{
								inputMode: 'numeric',
								pattern: '/^-?d+(?:.d+)?$/g',
							}}
							label='Sample Size (Required)'
							value={sampleSize}
							error={!!sampleSizeError}
							helperText={sampleSizeError}
							onChange={(event) => setSampleSize(event.target.value)}
						/>
						<Button variant='contained' sx={{ m: 2 }} onClick={handleSubmit}>
							<Typography value='h2'>Envoyer</Typography>
						</Button>
					</Stack>
				</LocalizationProvider>
			</FormControl>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h4'>Task Service</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Tâche exécutée avec succès, retour au suivi du processus.
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

export default FormComponent;
