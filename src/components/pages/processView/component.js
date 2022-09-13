/* eslint-disable no-unused-vars */
// React dependencies
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
// BPMN dependencies
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import minimapModule from 'diagram-js-minimap';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
// Visual dependencies
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import {
	Box,
	Breadcrumbs,
	Link,
	Typography,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@mui/material';
// Custom Components
import Logo from 'components/shared/logo/logo';
import TabBarWorkflow from './tabBar';
import Loader from 'components/shared/loader/loader';
import SideBar from 'components/shared/sidepanel/sidepanel';
// Data retrieve functions
import {
	getUrlBPMNByProcessName,
	getCurrentActivityName,
	getVariables,
	getManualTasks,
	getAllTasksProcess,
	getProcessDefinitionID,
} from 'utils/dataProcess/fetchDataProcess';
import {
	defaultDataVariables,
	defaultDataManualTask,
	defaultBpmnElement,
} from 'utils/mockData';

const useStyles = makeStyles()((theme) => {
	return {
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
			top: '13%',

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
	const { processKey, id } = useParams();
	const [activities, setActivities] = useState([]);
	const [variables, setVariables] = useState([]);
	const [manualTasks, setManualTasks] = useState([]);
	const [allTasks, setAllTasks] = useState(defaultBpmnElement);
	const processInformations = useLocation().state;
	const [rendered, setRendered] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
		window.location.reload(false);
	};

	useEffect(() => {
		const url = getUrlBPMNByProcessName(processKey);
		const pls = getCurrentActivityName(id).then((res) => {
			setActivities(res);
		});
		setVariables(getVariables(id));
		setManualTasks(getManualTasks(id));
		const pls2 = getAllTasksProcess(id).then((res) => {
			setAllTasks(res);
		});

		setTimeout(() => {
			axios
				.get(url)
				.then((r) => {
					setDiagram(r.data);
				})
				.catch((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 200);
		const interval = setInterval(() => {
			const pls = getCurrentActivityName(id).then((res) => {
				console.log('Current activity: ', res);
				console.log('Previous activity: ', activities);
				if (!(res === activities)) {
					setActivities(res);
					setOpen(true);
				}
			});
		}, 600000); // Update every 60 minutes
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				for (let i = 0; i < activities.length; i++) {
					console.log('activity', activities[i]);

					overlays.add(activities[i], 'note', {
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
					<GlobalStyles
						styles={{
							body: {
								backgroundColor: '#F9FAFC',
							},
						}}
					/>
					<Box className={classes.TitleHeader}>
						<Logo className={classes.logo} />
						<Typography variant='h3' className={classes.title}>
							Workflows
						</Typography>
					</Box>
					<Breadcrumbs
						separator='›'
						aria-label='breadcrumb'
						className={classes.bread}
					>
						<Link underline='hover' color='inherit' href='/'>
							Home
						</Link>
						<Typography color='text.primary'>
							Workflow : {processInformations.key}
						</Typography>
					</Breadcrumbs>
					<div id='containerBPMN' className={classes.viewerStyle} />

					<TabBarWorkflow
						variables={variables.length > 0 ? variables : defaultDataVariables}
						manualTasks={
							manualTasks.length > 0 ? manualTasks : defaultDataManualTask
						}
						bpmnElement={allTasks.length > 0 ? allTasks : defaultBpmnElement}
						id={id}
						processInformations={processInformations}
						processKey={processKey}
					/>
				</Box>
				{/* <Dialog open={open} onClose={handleClose}>
					<DialogTitle>
						<Typography variant='h4'>
							Solution Temporaire de suivi temps réel
						</Typography>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Le processus est passé à l'étape suivante: {activities}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant='contained' onClick={handleClose} autoFocus>
							Recharger la page
						</Button>
					</DialogActions>
				</Dialog> */}
			</>
		);
	}
};

export default BPMNViewer;
