import { FiChevronRight, FiCheck, FiPauseCircle } from 'react-icons/fi';
import { Box } from '@mui/material';

export const columnsProcessDataHistory = [
	{
		field: 'id',
		headerName: 'Identifiant',
		headerClassName: 'columns--header',
		flex: 0.5,
		minWidth: 200,
		description: 'Identifiant du processus',
	},
	{
		field: 'name',
		headerName: "Type d'enquête",
		headerClassName: 'columns--header',
		flex: 0.3,
		minWidth: 100,
		description: 'Nom du processus',
	},
	{
		field: 'businessKey',
		headerName: "Nom de l'enquête",
		headerClassName: 'columns--header',
		flex: 0.4,
		maxWidth: 220,
		description: 'Type de processus',
	},
	{
		field: 'duration',
		headerName: 'Durée',
		headerClassName: 'columns--header',
		flex: 0.3,
		minWidth: 150,
		description: "Durée d'exécution du processus",
	},
	{
		field: 'revision',
		headerName: 'Révision',
		headerClassName: 'columns--header',
		flex: 0.3,
		maxWidth: 100,
		description: "Nombre de révision du processus pendant l'exécution",
	},
	{
		field: 'action',
		headerName: ' ',
		headerClassName: 'columns--header',
		flex: 0.1,
		maxWidth: 80,
		align: 'center',
		renderCell: (params) => <FiChevronRight />,
	},
];

export const columnsTaskDataHistory = [
	{
		field: 'name',
		headerName: 'Nom',
		headerClassName: 'columns--header',
		flex: 0.3,
		minWidth: 100,
		description: 'Nom de la tâche',
	},
	{
		field: 'processID',
		headerName: 'Identifiant Processus',
		headerClassName: 'columns--header',
		flex: 0.6,
		minWidth: 450,
		description: 'Processus associé à la tâche',
	},
	{
		field: 'type',
		headerName: 'Type',
		headerClassName: 'columns--header',
		flex: 0.2,
		minWidth: 100,
		description: 'Type de tâche',
	},
	{
		field: 'duration',
		headerName: 'Durée',
		headerClassName: 'columns--header',
		flex: 0.2,
		minWidth: 150,
		description: "Durée d'exécution de la tâche",
	},
	{
		field: 'endDate',
		headerName: 'Date fin',
		headerClassName: 'columns--header',
		flex: 0.3,
		minWidth: 150,
		description: 'Date de complétion',
	},
	{
		field: 'deleted',
		headerName: 'Réalisé',
		headerClassName: 'columns--header',
		flex: 0.3,
		maxWidth: 100,
		align: 'center',
		description: 'Si la tâche a été supprimée ou non',
		renderCell: (params) =>
			!params.value ? (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<FiCheck size={20} color='#17C3B2' />
				</Box>
			) : (
				<Box display='flex' alignItems='center' justifyContent='center'>
					<FiPauseCircle size={20} color='#F25C54' sx={{ align: 'center' }} />
				</Box>
			),
	},
];
