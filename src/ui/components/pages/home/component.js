import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Logo from 'ui/components/shared/logo/logo';
import ProcessOverview from './processOverview';
import TabBarDashboard from './tabBar';
import SideBar from 'ui/components/shared/sidepanel/sidepanel';
import Footer from 'ui/components/shared/footer/component';
import {
	fetchProcessData,
	fetchTaskData,
} from 'core/utils/dataHomepage/fetchDataHomepage';
import Loader from '../../shared/loader/loader';

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

// You may have lots of faulty rerender because a modification of PieTask will cause a rerender of all Home, children included when it's affect a small part of ProcessOverview component
const Home = () => {
	const { classes } = useStyles();
	const [pieProcessdata, setPieProcessdata] = useState({});
	const [pieTaskdata, setPieTaskdata] = useState({});
	const [loading, setLoading] = useState(true);
	const [dataProcess, setDataProcess] = useState([]);
	const [dataTask, setDataTask] = useState([]);
	useEffect(() => {
		const resultProcess = fetchProcessData();
		setDataProcess(resultProcess[0]);
		console.log(resultProcess[0]);
		setPieProcessdata(resultProcess[1]);
		const resultTask = fetchTaskData();
		setDataTask(resultTask[0]);
		setPieTaskdata(resultTask[1]);

		setTimeout(() => {
			setLoading(false);
		}, 250);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return (
			<>
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
						//pieIncidentdata={pieIncidentdata}
					/>
					<TabBarDashboard
						dataTask={dataTask}
						dataProcess={dataProcess}
						//dataIncident={dataIncident}
					/>
				</Grid>
				<Footer />
			</>
		);
	}
};

export default Home;
