import {
	FiChevronRight,
	FiCheck,
	FiPauseCircle,
	FiSlash,
} from 'react-icons/fi';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export const columnsProcessData = [
	{
		field: 'tag',
		headerName: "Nom de l'enquête",
		headerClassName: 'columns--header',
		flex: 0.2,
		description: 'Nom du processus défini par BPMN',
	},
	{
		field: 'processKey',
		headerName: "Type d'enquête",
		headerClassName: 'columns--header',
		flex: 0.2,
		minWidth: 150,
		description: "Type d'enquête",
	},
	{
		field: 'documentation',
		headerName: 'Description',
		headerClassName: 'columns--header',
		flex: 0.6,
		minWidth: 300,
		description: 'Description du processus',
	},
	{
		field: 'date',
		headerName: 'Date début',
		headerClassName: 'columns--header',
		flex: 0.2,
		minWidth: 150,
		description: "Date de début de l'exécution du processus",
	},

	{
		field: 'state',
		headerName: 'Statut',
		headerClassName: 'columns--header',
		flex: 0.1,
		align: 'center',
		description:
			"Indique si le processus est en cours d'exécution, en erreur ou suspendu",
		renderCell: (params) => {
			switch (params.value) {
				case 'suspended':
					return (
						<Box display='flex' alignItems='center' justifyContent='center'>
							<FiPauseCircle size={20} color='#F25C54' />
						</Box>
					);
				case 'deadLetter':
					return (
						<Box display='flex' alignItems='center' justifyContent='center'>
							<FiSlash size={20} color='#F25C54' />
						</Box>
					);
				default:
					return (
						<Box display='flex' alignItems='center' justifyContent='center'>
							<FiCheck size={20} color='#17C3B2' />
						</Box>
					);
			}
		},
	},
	{
		field: 'action',
		headerName: ' ',
		headerClassName: 'columns--header',
		flex: 0.15,
		align: 'center',
		description: "Accès à l'exécution du processus",
		renderCell: (params) => (
			<Link
				to={`/process/${params.value.url}`}
				style={{ textDecoration: 'none' }}
				state={{
					doc: params.value.doc,
					date: params.value.date,
					key: params.value.key,
					state: params.value.state,
				}}
			>
				<FiChevronRight />
			</Link>
		),
	},
];

// Mock column name userTask
export const columnsManu = [
	{
		field: 'name',
		headerName: 'Nom',
		headerClassName: 'columns--header',
		flex: 0.3,

		description: 'Nom de la tâche manuelle',
	},
	{
		field: 'description',
		headerName: 'Description',
		headerClassName: 'columns--header',
		flex: 0.6,

		description: 'Description de la tâche manuelle',
	},
	{
		field: 'createTime',
		headerName: 'Date début',
		headerClassName: 'columns--header',
		flex: 0.2,
		minWidth: 170,
		description: 'Date de début de la tâche manuelle',
	},
	{
		field: 'processInstance',
		headerName: 'Processus Associé',
		headerClassName: 'columns--header',
		flex: 0.4,
		minWidth: 150,
		description: 'Processus pour lequel la tâche manuelle est associée',
	},
];

// Mock data for available usertasks
export const dataManu = [
	{
		id: 'TaskID1',
		state: true,
		name: 'Select Sample',
		date: '04/02/2022-10:20:45',
	},
	{
		id: 'TaskID2',
		state: false,
		name: '[nomTacheManu]',
		date: '04/02/2022-10:20:45',
	},
];

// Mock column incidents
export const columnsIncidents = [
	{
		field: 'typeIncident',
		headerName: 'Type Incident',
		headerClassName: 'columns--header',
		flex: 0.4,
		maxWidth: 120,
		description: "Type d'incident",
	},
	{
		field: 'name',
		headerName: 'Nom',
		headerClassName: 'columns--header',
		flex: 0.3,
		minWidth: 120,
		description: "Nom de la tâche associée à l'incident",
	},
	{
		field: 'id',
		headerName: 'ID',
		headerClassName: 'columns--header',
		flex: 0.4,
		minWidth: 150,
		description: "Identifiant de la tâche associée à l'incident",
	},
	{
		field: 'type',
		headerName: 'Type Tâche',
		headerClassName: 'columns--header',
		flex: 0.3,
		maxWidth: 150,
		description: "Type de la tâche associée à l'incident",
	},

	{
		field: 'processID',
		headerName: 'Process Definition ID',
		headerClassName: 'columns--header',
		flex: 0.4,
		minWidth: 500,
		description: "Identifiant du processus associé à l'incident",
	},
	{
		field: 'retries',
		headerName: 'Tentatives',
		headerClassName: 'columns--header',
		flex: 0.2,
		maxWidth: 100,
		description: "Nombre d'essais exectués pour l'incident",
	},
];
