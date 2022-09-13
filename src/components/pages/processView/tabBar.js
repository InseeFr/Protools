/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import {
	StyledTabs,
	StyledTab,
} from 'components/shared/styledComponents/tabs/tabs';
import CustomDataGrid from 'components/shared/dataGrid/component';
import { makeStyles } from 'tss-react/mui';
import theme from 'theme';
import CustomCard from 'components/shared/styledComponents/card/card';
import { tabPropIndex, TabPanel } from 'components/shared/tabPanel/tabPanel';
import { FiUserPlus } from 'react-icons/fi';

import {
	processVariablesColumns,
	processBPMNElementColumn,
} from 'utils/dataProcess/mockDataProcess';
import ProcessGlobalInfo from './processGlobalInfo';

const useStyles = makeStyles()((theme) => {
	return {
		card: {
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
			marginTop: '0.5%',
			marginBottom: '5%',
			position: 'absolute',
			top: '60%',
			padding: 5,
			[theme.breakpoints.down('md')]: {
				width: '84%',
				marginLeft: '11.5%',
				marginTop: '2.5%',
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
	const dataVariables = props.variables;
	const dataManualTasks = props.manualTasks;
	const dataBpmnElements = props.bpmnElement;
	const id = props.id;
	const processInformations = props.processInformations;
	const processKey = props.processKey;

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
							pathname: `/form`,
						}}
						underline='none'
						state={{
							id: id,
							taskName: params.row.name,
							taskID: params.row.id,
							variables: dataVariables,
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
						activeTask={dataManualTasks.length}
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
							rows={dataVariables}
							columns={processVariablesColumns}
							height='320'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={2} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataManualTasks}
							columns={processManualTasksColumns}
							height='320'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={3} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataBpmnElements}
							columns={processBPMNElementColumn}
							height='320'
						/>
					</CardContent>
				</TabPanel>
			</CustomCard>
		</>
	);
};

export default TabBarWorkflow;
