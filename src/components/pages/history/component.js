import React, { useEffect, useState } from 'react';
import { GlobalStyles } from 'tss-react';
import { Grid, Box, Typography } from '@mui/material';
import Loader from 'components/shared/loader/loader';
import { setAutoFreeze } from 'immer';
import { makeStyles } from 'tss-react/mui';
import Logo from 'components/shared/logo/logo';
import SideBar from 'components/shared/sidepanel/sidepanel';
import TabBarHistory from './tabBar';
import {
	fetchProcessDataHistory,
	fetchTaskDataHistory,
} from 'utils/dataHistory/fetchDataHistory';

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

	// Retrieving all data during the component's mounting -> //TODO : Remove loading screen once linked to Keyloack
	useEffect(() => {
		const result = fetchTaskDataHistory();
		setDataTask(result[0]);
		setDataActivities(result[1]);
		const result2 = fetchProcessDataHistory();
		setDataProcess(result2[0]);
		setTimeout(() => {
			setLoading(false);
		}, 450);

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
			</>
		);
	}
};

export default History;
