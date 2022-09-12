import React, { useEffect, useState } from 'react';
import { GlobalStyles } from 'tss-react';
import { Grid, Box, Typography } from '@mui/material';

import { makeStyles } from 'tss-react/mui';
import Logo from 'components/shared/logo/logo';
import ProcessOverview from './processOverview';
import TabBarDashboard from './tabBar';
import SideBar from 'components/shared/sidepanel/sidepanel';
import {
	fetchProcessData,
	fetchTaskData,
	fetchIncidentsData,
} from 'utils/dataHomepage/fetchDataHomepage';
import Loader from '../../shared/loader/loader';
//import theme from 'theme';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		title: {
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		TitleHeader: {
			position: 'absolute',
			top: '3%',
			left: '17%',
			display: 'flex',
			alignItems: 'center',
		},
		logo: {
			verticalAlign: 'middle',
		},
		gridItemProcessList: {
			textAlign: 'center',
		},
	};
});

const Home = () => {
	const { classes } = useStyles();
	const [pieProcessdata, setPieProcessdata] = useState({});
	const [pieTaskdata, setPieTaskdata] = useState({});
	const [loading, setLoading] = useState(true);
	const [dataProcess, setDataProcess] = useState([]);
	const [dataTask, setDataTask] = useState([]);
	const [dataIncident, setDataIncident] = useState([]);
	const [pieIncidentdata, setPieIncidentdata] = useState({});
	// Retrieving all data during the component's mounting -> //TODO : Remove loading screen once linked to Keyloack
	useEffect(() => {
		const resultTask = fetchTaskData();
		setDataTask(resultTask[0]);
		setPieTaskdata(resultTask[1]);

		const resultProcess = fetchProcessData();
		setDataProcess(resultProcess[0]);
		setPieProcessdata(resultProcess[1]);
		console.log('loading: ', loading);

		const resultIncident = fetchIncidentsData();
		setDataIncident(resultIncident[0]);
		setPieIncidentdata(resultIncident[1]);

		setTimeout(() => {
			setLoading(false);
		}, 350);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) {
		return (
			<>
				<GlobalStyles
					styles={{
						body: {
							backgroundColor: '#F9FAFC',
						},
					}}
				/>

				<Grid justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Tableau de bord
						</Typography>
					</Box>
					<Loader />
				</Grid>
			</>
		);
	} else {
		return (
			<>
				<GlobalStyles
					styles={{
						body: {
							backgroundColor: '#F9FAFC',
						},
					}}
				/>
				<SideBar page='home' />
				<Grid justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Tableau de bord
						</Typography>
					</Box>
					<ProcessOverview
						pieProcessdata={pieProcessdata}
						pieTaskdata={pieTaskdata}
						pieIncidentdata={pieIncidentdata}
					/>
					<TabBarDashboard
						dataTask={dataTask}
						dataProcess={dataProcess}
						dataIncident={dataIncident}
					/>
				</Grid>
			</>
		);
	}
};

export default Home;
