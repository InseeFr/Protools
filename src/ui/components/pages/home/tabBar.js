/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, Box, IconButton } from '@mui/material';
import {
	FiChevronRight,
	FiCheck,
	FiPauseCircle,
	FiSlash,
} from 'react-icons/fi';
import {
	StyledTabs,
	StyledTab,
} from 'ui/components/shared/styledComponents/tabs/tabs';
import { makeStyles } from 'tss-react/mui';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import { tabPropIndex, TabPanel } from 'ui/components/shared/tabPanel/tabPanel';
import { columnsManu } from 'core/utils/dataHomepage/mockDataHomepage';
import CustomDataGrid from 'ui/components/shared/dataGrid/component';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		card: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '80%',
			marginLeft: '17%',
			marginTop: '1%',

			[theme.breakpoints.down('md')]: {
				width: '85%',
				marginLeft: '11.5%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				marginLeft: '5%',
			},
		},
		cardTab: {
			display: 'flex',
			width: '80%',
			marginLeft: '17%',
			marginTop: '0.5%',
			[theme.breakpoints.down('lg')]: {
				marginTop: '1.2%',
			},
			[theme.breakpoints.down('md')]: {
				width: '85%',
				marginLeft: '11.5%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				marginLeft: '5%',
			},
		},
		cardContent: {
			padding: 0,
			'&:last-child': {
				paddingBottom: 0,
			},
		},
		cardContentTable: {
			padding: 0,
			'&:last-child': {
				padding: 12,
			},
			width: '100%',
		},
		tabWidth: {
			width: '98%',
		},
	};
});
const TabBarDashboard = (props) => {
	const { classes } = useStyles();
	const [value, setValue] = useState(0);
	const dataProcess = props.dataProcess;
	const dataTask = props.dataTask;

	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const navigationHandler = (id, processKey, doc, date, key, state) => {
		console.log('Navigate to process page');
		navigate(`/process`, {
			state: {
				id: id,
				processKey: processKey,
				doc: doc,
				date: date,
				key: key,
				state: state,
			},
		});
	};

	const columnsProcessData = [
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
				<IconButton
					color='primary'
					onClick={() => {
						console.log("ici c'est le bouton");
						navigationHandler(
							params.value.id,
							params.value.processKey,
							params.value.url,
							params.value.doc,
							params.value.date,
							params.value.key,
							params.value.state
						);
					}}
				>
					<FiChevronRight />
				</IconButton>
			),
		},
	];

	return (
		<>
			<CustomCard className={classes.card}>
				<CardContent className={classes.cardContent}>
					<StyledTabs
						value={value}
						textColor='primary'
						indicatorColor='secondary'
						onChange={handleChange}
						variant='scrollable'
						allowScrollButtonsMobile
					>
						<StyledTab label='Enquêtes en cours' {...tabPropIndex(0)} />

						<StyledTab
							label='Tâches manuelles en attente'
							{...tabPropIndex(1)}
						/>
						{/* <StyledTab label='Incidents en cours' {...tabPropIndex(2)} /> */}
					</StyledTabs>
				</CardContent>
			</CustomCard>

			<CustomCard className={classes.cardTab}>
				<TabPanel value={value} index={0} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataProcess}
							columns={columnsProcessData}
							height='500'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={1} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataTask}
							columns={columnsManu}
							height='500'
						/>
					</CardContent>
				</TabPanel>
			</CustomCard>
		</>
	);
};

export default TabBarDashboard;
