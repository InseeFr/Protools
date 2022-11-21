/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CardContent, Box } from '@mui/material';
import {
	StyledTabs,
	StyledTab,
} from 'ui/components/shared/styledComponents/tabs/tabs';
import { makeStyles } from 'tss-react/mui';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import { tabPropIndex, TabPanel } from 'ui/components/shared/tabPanel/tabPanel';
import theme from 'ui/theme';
import { columnsTaskDataHistory } from 'core/utils/dataHistory/mockDataHistory';
import CustomDataGrid from 'ui/components/shared/dataGrid/component';
import { columnsProcessDataHistory } from 'core/utils/dataHistory/mockDataHistory';
import {
	fetchProcessDataHistory,
	fetchTaskDataHistory,
} from 'core/utils/dataHistory/fetchDataHistory';

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
			marginTop: '2.5%',
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
			width: '97%',
		},
	};
});
const TabBarHistory = (props) => {
	const { classes } = useStyles();
	const [value, setValue] = useState(0);
	const [dataProcess, setDataProcess] = useState([]);
	const [dataTask, setDataTask] = useState([]);
	const [dataActivities, setDataActivities] = useState([]);

	useEffect(() => {
		const result = fetchTaskDataHistory();
		setDataTask(result[0]);
		setDataActivities(result[1]);
		const result2 = fetchProcessDataHistory();
		setDataProcess(result2[0]);
	}, []);

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
						<StyledTab label='Processus' {...tabPropIndex(0)} />

						<StyledTab
							label='Tâches manuelles et automatisées'
							{...tabPropIndex(1)}
						/>
						<StyledTab label='Évènements' {...tabPropIndex(2)} />
					</StyledTabs>
				</CardContent>
			</CustomCard>

			<CustomCard className={classes.cardTab}>
				<TabPanel value={value} index={0} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataProcess}
							columns={columnsProcessDataHistory}
							height='770'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={1} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataTask}
							columns={columnsTaskDataHistory}
							height='770'
						/>
					</CardContent>
				</TabPanel>
				<TabPanel value={value} index={2} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataActivities}
							columns={columnsTaskDataHistory}
							height='770'
						/>
					</CardContent>
				</TabPanel>
			</CustomCard>
		</>
	);
};

export default TabBarHistory;