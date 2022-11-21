/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CardContent } from '@mui/material';
import {
	StyledTabs,
	StyledTab,
} from 'ui/components/shared/styledComponents/tabs/tabs';
import { makeStyles } from 'tss-react/mui';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import { tabPropIndex, TabPanel } from 'ui/components/shared/tabPanel/tabPanel';
import {
	columnsManu,
	columnsProcessData,
	//columnsIncidents,
} from 'core/utils/dataHomepage/mockDataHomepage';
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
	//const dataIncident = props.dataIncident;

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
				{/* <TabPanel value={value} index={2} className={classes.tabWidth}>
					<CardContent className={classes.cardContentTable}>
						<CustomDataGrid
							rows={dataIncident}
							columns={columnsIncidents}
							height='500'
						/>
					</CardContent>
				</TabPanel> */}
			</CustomCard>
		</>
	);
};

export default TabBarDashboard;
