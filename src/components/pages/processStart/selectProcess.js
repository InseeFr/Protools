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
import { startProcess } from 'utils/dataProcess/processExecution';
import { useNavigate } from 'react-router-dom';

const SelectProcess = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState('EnquêteTest');
	const [selectedKey, setSelectedKey] = useState('Test');
	const [open, setOpen] = useState(false);
	const [processParams, setProcessParams] = useState([]);

	const getProcessKey = (selected, callback) => {
		switch (selected) {
			case 'EnquêteTest':
				return ['EnqueteTest', {}];
			case 'EnqueteWeb2':
				return [
					'EnqueteWeb2',
					{
						idSurvey: '0',
						name: 'SurveyQualitéVolaille',
						dateDeb: '01-01-2022',
						dateEnd: '01-12-2022',
						state_survey: 'notReady',
						sampleSize: '800',
					},
				];
			case 'EnqueteWeb':
				return [
					'EnqueteWeb',
					{
						idSurvey: '0',
						name: 'SurveyQualitéVolaille',
						dateDeb: '01-01-2022',
						dateEnd: '01-12-2022',
						state_survey: 'notReady',
						sampleSize: '600',
					},
				];
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

	//const [url, setUrl] = useState(getUrl(selected));
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
				<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
					<InputLabel color='primary'>Nom d'enquête :</InputLabel>
					<Select
						color='primary'
						labelId='SelectBusinessKey'
						value={selectedKey}
						label='Select BusinessKey'
						onChange={handleChangeKey}
					>
						<MenuItem value={'Famille'}>Famille</MenuItem>
						<MenuItem value={'PQV'}>Qualité Volaille</MenuItem>
						<MenuItem value={'Test'}>Test</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
					<InputLabel color='primary'> Type d'enquête :</InputLabel>
					<Select
						color='primary'
						labelId='SelectBPMN'
						value={selected}
						label='Select BPMN'
						onChange={handleChange}
					>
						<MenuItem value={'EnquêteTest'}>Enquête de Test</MenuItem>
						<MenuItem value={'EnqueteWeb'}>Enquête Web Sans Message</MenuItem>
						<MenuItem value={'EnqueteWeb2'}>Enquête Web Avec Message</MenuItem>
						<MenuItem value={'EnqueteWebContinue'}>
							Enquête Web Continue
						</MenuItem>
					</Select>
				</FormControl>
				<Button variant='contained' onClick={navigationHandler}>
					Valider
				</Button>
			</Stack>

			<Dialog open={open} onClose={handleClose}>
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
