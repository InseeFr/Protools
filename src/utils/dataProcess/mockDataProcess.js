import { Box } from '@mui/material';
import { FiEdit3, FiCheck, FiXCircle } from 'react-icons/fi';

export const processVariablesColumns = [
	{
		field: 'name',
		headerName: 'Nom',
		flex: 0.4,
		minWidth: 150,
		description: 'Nom de la varaiable',
	},
	{
		field: 'type',
		headerName: 'Type',
		flex: 0.2,
		minWidth: 100,
		description: 'Type de variable (string, integer, boolean, etc.)',
	},
	{
		field: 'value',
		headerName: 'Valeur',
		flex: 0.6,
		minWidth: 200,
		description: 'Valeur stockée en base de données',
	},
	{
		field: 'action',
		headerName: ' ',
		align: 'center',
		flex: 0.1,
		minWidth: 90,
		renderCell: (value) => <FiEdit3 />,
		description: 'Modifier ou supprimer la variable',
	},
];

export const processBPMNElementColumn = [
	{
		field: 'id',
		headerName: "ID de l'activité",
		flex: 0.2,
		minWidth: 100,
		description: "Identifiant de l'activité (Notation BPMN)",
	},
	{
		field: 'name',
		headerName: 'Nom',
		flex: 0.3,
		minWidth: 150,
		description: "Nom de l'activité (Notation BPMN)",
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 0.7,
		minWidth: 200,
		description: "Description de l'activité",
	},

	{
		field: 'asynchronous',
		headerName: 'Async ?',
		align: 'center',
		flex: 0.1,
		minWidth: 90,
		description: "Indique si l'activité est synchrone ou asynchrone",
		renderCell: (value) =>
			!value ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<FiCheck size={20} sx={{ align: 'center' }} />
				</Box>
			) : (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<FiXCircle size={20} sx={{ align: 'center' }} />
				</Box>
			),
	},
];
