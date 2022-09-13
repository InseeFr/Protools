import React, { useState } from 'react';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUrlBPMNByProcessName } from 'utils/dataProcess/fetchDataProcess';

const SelectBPMN = () => {
	//const classes = useStyles();
	const [selected, setSelected] = useState('EnqueteTest');
	const navigate = useNavigate();
	const hasFinished = () => {
		console.log('finished');
	};
	const handleChange = (event) => {
		console.log('event: ' + event.target.value);
		setSelected(event.target.value);
	};

	const navigationHandler = () => {
		console.log('Navigate to bpmn file');
		navigate('/display', {
			state: { selected: getUrlBPMNByProcessName(selected, hasFinished) },
		});
	};

	return (
		<Stack spacing={3}>
			<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
				<InputLabel>Fichier BPMN</InputLabel>
				<Select value={selected} label='Select BPMN' onChange={handleChange}>
					<MenuItem value={'EnqueteTest'}>Enquête de Test</MenuItem>
					<MenuItem value={'EnqueteWeb'}>Enquête Web Sans Message</MenuItem>
					<MenuItem value={'EnqueteWeb2'}>Enquête Web Avec Message</MenuItem>
					<MenuItem value={'EnqueteWebContinue'}>
						Enquête Web Continue (Pas là)
					</MenuItem>
				</Select>
				<Button
					variant='contained'
					sx={{ marginTop: 3 }}
					onClick={navigationHandler}
				>
					Valider
				</Button>
			</FormControl>
		</Stack>
	);
};

export default SelectBPMN;
