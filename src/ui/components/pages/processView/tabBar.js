/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { fetcherGet } from 'core/fetchData/fetch';
import { Link } from 'react-router-dom';
import {
	StyledTabs,
	StyledTab,
} from 'ui/components/shared/styledComponents/tabs/tabs';
import CustomDataGrid from 'ui/components/shared/dataGrid/component';
import { makeStyles } from 'tss-react/mui';
import { CardContent } from '@mui/material';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import { tabPropIndex, TabPanel } from 'ui/components/shared/tabPanel/tabPanel';
import { FiUserPlus } from 'react-icons/fi';
import {
	processVariablesColumns,
	processBPMNElementColumn,
} from 'core/utils/dataProcess/mockDataProcess';
import ProcessGlobalInfo from './processGlobalInfo';

const useStyles = makeStyles()((theme) => {
	return {
		card: {
			backgroundColor: theme.palette.secondary.card,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '80%',
			marginLeft: '16%',
			position: 'absolute',
			top: '55%',
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
			alignItems: 'center',
			justifyContent: 'center',
			width: '79.5%',
			marginLeft: '16%',
			marginTop: '1%',
			marginBottom: '5%',
			position: 'absolute',
			top: '60%',
			padding: 5,
			[theme.breakpoints.down('lg')]: {
				marginTop: '1.5%',
				width: '79%',
			},
			[theme.breakpoints.down('md')]: {
				width: '84%',
				marginLeft: '11.5%',
				marginTop: '3.5%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				marginLeft: '5%',
				marginTop: '3%',
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
			width: '98%',
		},
		tabWidth: {
			width: '98%',
		},
	};
});

const TabBarWorkflow = (props) => {
	const { classes } = useStyles();
	const [value, setValue] = useState(0);
	const variables = props.variables;
	const manualTasks = props.manualTasks;
	const bpmnElements = props.bpmnElement;
	const id = props.id;
	const processInformations = props.processInformations;
	const processKey = props.processKey;

	//TODO : Move this elsewhere
	const processManualTasksColumns = [
		{
			field: 'name',
			headerName: 'Nom',
			flex: 0.3,
			minWidth: 100,
			description: 'Nom de la tâche',
		},
		{
			field: 'id',
			headerName: 'Task ID',
			flex: 0.5,
			minWidth: 200,
			description: 'Identifiant de la tâche',
		},
		{
			field: 'createTime',
			headerName: 'Date de création',
			flex: 0.3,
			minWidth: 150,
			description: 'Date de création de la tâche',
		},
		{
			field: 'category',
			headerName: 'Type',
			flex: 0.3,
			minWidth: 150,
			description: 'Type de tâche manuelle',
		},
		{
			field: 'action',
			headerName: ' ',
			align: 'center',
			flex: 0.1,
			minWidth: 90,
			description: 'Exécuter cett tâche',
			renderCell: (params) => (
				<>
					<Link
						to={{
							pathname: params.row.link,
						}}
						underline='none'
						state={{
							id: id,
							taskName: params.row.name,
							taskID: params.row.id,
							variables: variables,
							taskCategory: params.row.category,
						}}
					>
						<FiUserPlus />
					</Link>
				</>
			),
		},
	];

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
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
						<StyledTab label='Informations' {...tabPropIndex(0)} />

						<StyledTab label='Variables de Contexte' {...tabPropIndex(1)} />
						<StyledTab label='Taches manuelles' {...tabPropIndex(2)} />
						<StyledTab label='Éléments BPMN' {...tabPropIndex(3)} />
					</StyledTabs>
				</CardContent>
			</CustomCard>

			<CustomCard className={classes.cardTab}>
				<TabPanel value={value} index={0}>
					<ProcessGlobalInfo
						processID={id}
						activeTask={manualTasks.length}
						date={processInformations.date}
						documentation={processInformations.doc}
						processKey={processKey}
						businessKey={processInformations.key}
						state={processInformations.state}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={variables}
							columns={processVariablesColumns}
							height='600'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={2} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={manualTasks}
							columns={processManualTasksColumns}
							height='600'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={3} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={bpmnElements}
							columns={processBPMNElementColumn}
							height='600'
						/>
					</CardContent>
				</TabPanel>
			</CustomCard>
		</>
	);
};

export default TabBarWorkflow;
