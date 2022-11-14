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
import { getProcessDataVisuTypes } from '../../../utils/dataVisuTypes/fetchDataVisuTypes';

const SelectProtocol = () => {
	const [selected, setSelected] = useState('EnqueteTest');
	const navigate = useNavigate();

	const handleChange = (event) => {
		console.log('event: ' + event.target.value);
		setSelected(event.target.value);
	};

	const navigationHandler = () => {
		console.log('Navigate to bpmn file');
		navigate('/protocol-display', {
			state: {
				selected: selected,
				processInfo: getProcessDataVisuTypes(selected),
			},
		});
	};

	return (
		<Stack spacing={3}>
			<FormControl size='small' fullWidth sx={{ marginTop: 3 }}>
				<InputLabel>Protocole</InputLabel>
				<Select value={selected} label='Select BPMN' onChange={handleChange}>
					<MenuItem value={'EnqueteWebContinue'}>Enquête Famille</MenuItem>
					<MenuItem value={'ProcessTestFeature'}>
						Enquête de Test {'(expérimental)'}
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

export default SelectProtocol;
