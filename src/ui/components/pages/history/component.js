import React, { useState, useEffect } from 'react';
import { GlobalStyles } from 'tss-react';
import { Grid, Box, Typography } from '@mui/material';
import Loader from 'ui/components/shared/loader/loader';
import { setAutoFreeze } from 'immer';
import { makeStyles } from 'tss-react/mui';
import Logo from 'ui/components/shared/logo/logo';
import SideBar from 'ui/components/shared/sidepanel/sidepanel';
import Footer from 'ui/components/shared/footer/component';
import TabBarHistory from './tabBar';
import {
	fetchProcessDataHistory,
	fetchTaskDataHistory,
} from 'core/utils/dataHistory/fetchDataHistory';
import { fetchConfig } from 'core/config';

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

const History = () => {
	setAutoFreeze(false);
	const { classes } = useStyles();
	const [loading, setLoading] = useState(true);
	const [dataProcess, setDataProcess] = useState([]);
	const [dataTask, setDataTask] = useState([]);
	const [dataActivities, setDataActivities] = useState([]);

	useEffect(() => {
		fetchConfig().then((config) => {
			const API_URL = config.API_URL;
			const result = fetchTaskDataHistory(API_URL);
			setDataTask(result[0]);
			setDataActivities(result[1]);
			const result2 = fetchProcessDataHistory(API_URL);
			setDataProcess(result2[0]);
		});
		setTimeout(() => {
			setLoading(false);
		}, 250);
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
							Historique
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
				<SideBar page='history' />
				<Grid justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Historique
						</Typography>
					</Box>
					<TabBarHistory
						dataTask={dataTask}
						dataProcess={dataProcess}
						dataActivities={dataActivities}
					/>
				</Grid>
				<Footer />
			</>
		);
	}
};

export default History;
