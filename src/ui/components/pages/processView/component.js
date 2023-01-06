/* eslint-disable no-unused-vars */
// React dependencies
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// BPMN dependencies
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import minimapModule from 'diagram-js-minimap';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
// Visual dependencies
import { makeStyles } from 'tss-react/mui';
import { Box, Typography, Grid } from '@mui/material';
// Custom Components
import Logo from 'ui/components/shared/logo/logo';
import TabBarWorkflow from './tabBar';
import Loader from 'ui/components/shared/loader/loader';
import SideBar from 'ui/components/shared/sidepanel/sidepanel';
// Data retrieve functions
import {
	getBPMNByProcessName,
	getCurrentActivityName,
	getVariables,
	getManualTasks,
	getAllTasksProcess,
} from 'core/utils/dataProcess/fetchDataProcess';

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
		viewerStyle: {
			backgroundColor: '#FFFF',
			border: `1px solid ${theme.palette.primary.main}`,
			height: '40%',
			width: '80%',
			marginLeft: '16%',
			position: 'absolute',
			top: '12%',

			zIndex: 1,
			[theme.breakpoints.down('md')]: {
				width: '84%',
				marginLeft: '11.5%',
				//marginTop: '2.5%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				marginLeft: '5%',
				//marginTop: '3%',
			},
		},
		bread: {
			position: 'absolute',
			top: '10%',
			left: '16%',
			color: theme.palette.primary.main,
			opacity: 0.8,
			[theme.breakpoints.down('md')]: {
				left: '12%',
			},
			[theme.breakpoints.down('sm')]: {
				left: '5%',
			},
		},
		highlight: {
			backgroundColor: theme.palette.secondary.main,
			opacity: 0.8,
			pointerevents: null,
		},
	};
});

const BPMNViewer = (props) => {
	const { classes } = useStyles();
	const [diagram, setDiagram] = useState('');
	const [loading, setLoading] = useState(true);
	const [activities, setActivities] = useState([]);
	const [variables, setVariables] = useState([]);
	const [manualTasks, setManualTasks] = useState([]);
	const [allTasks, setAllTasks] = useState([]);
	const [statusCode, setStatusCode] = useState(0);
	const processInformations = useLocation().state;
	const processKey = processInformations.processKey;
	const id = processInformations.id;
	const [rendered, setRendered] = useState(false);

	useEffect(() => {
		getCurrentActivityName(id).then((res) => {
			setActivities(res);
		});
		setVariables(getVariables(id));
		setManualTasks(getManualTasks(id));
		getAllTasksProcess(id).then((res) => {
			setAllTasks(res);
		});
		setTimeout(() => {
			getBPMNByProcessName(processKey).then((res) => {
				setDiagram(res[0]);
				setStatusCode(res[1]);
			});

			setLoading(false);
		}, 200);
	}, [id, processKey]);

	if (diagram.length > 0 && !rendered) {
		// Define BPMN Viewer
		const viewer = new NavigatedViewer({
			container: '#containerBPMN',
			additionalModules: [minimapModule],
		});
		// Import BPMN diagram into the viewer
		viewer
			.importXML(diagram)
			.then(() => {
				viewer.get('canvas').zoom('fit-viewport');
				// add visual token to the diagram
				const overlays = viewer.get('overlays');
				for (const element of activities) {
					console.log('activity', element);

					overlays.add(element, 'note', {
						position: {
							bottom: 18,
							right: 18,
						},
						scale: {
							min: 1.2,
						},
						html: '<div class="diagram-note">🦊</div>',
					});
				}
				setRendered(true);
				//setActivities(activities);
			})
			.catch((err) => {
				console.log('error', err);
			});
	}

	if (diagram.length === 0 && loading) {
		return (
			<>
				<SideBar />
				<Grid justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Visualisation Protocoles
						</Typography>
					</Box>
					<Loader />
				</Grid>
			</>
		);
	}
	if (loading) {
		return (
			<>
				<SideBar />
				<Grid justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Workflows
						</Typography>
					</Box>
					<Loader />
				</Grid>
			</>
		);
	} else {
		return (
			<>
				<SideBar page='process' />
				<Box justifyContent='center'>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Workflows
						</Typography>
					</Box>
					<div id='containerBPMN' className={classes.viewerStyle} />
					<TabBarWorkflow
						variables={variables}
						manualTasks={manualTasks}
						bpmnElement={allTasks}
						id={id}
						processInformations={processInformations}
						processKey={processKey}
					/>
				</Box>
			</>
		);
	}
};

export default BPMNViewer;
