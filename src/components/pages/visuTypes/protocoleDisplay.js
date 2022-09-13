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
import { Box, Typography } from '@mui/material';
// Custom Components
import Logo from 'components/shared/logo/logo';
import SideBar from 'components/shared/sidepanel/sidepanel';
import CustomCard from 'components/shared/styledComponents/card/card';
// Data retrieve functions

import ProtocolInfo from './protocolInfo';

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
			height: '53%',
			width: '80%',
			marginLeft: '16%',
			position: 'absolute',
			top: '10%',

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
		cardTab: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '79.5%',
			marginLeft: '16%',
			marginTop: '0.5%',
			marginBottom: '5%',
			position: 'absolute',
			top: '65%',
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

		highlight: {
			backgroundColor: theme.palette.secondary.main,
			opacity: 0.8,
			pointerevents: null,
		},
	};
});

const ProtocolTypeViwer = (props) => {
	const { classes } = useStyles();
	const [diagram, setDiagram] = useState('');
	const [rendered, setRendered] = useState(false);
	const params = useLocation();
	const url = params.state.selected;
	const processInfo = params.state.processInfo;

	useEffect(() => {
		setTimeout(() => {
			axios
				.get(url)
				.then((r) => {
					setDiagram(r.data);
					console.log('processInformationsDoc : ', processInfo);
				})
				.catch((e) => {
					console.log(e);
				});
		}, 200);
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
				setRendered(true);
			})
			.catch((err) => {
				console.log('error', err);
			});
	}

	return (
		<>
			<SideBar page='design' />
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
						Visualisation Protocoles
					</Typography>
				</Box>
				<div id='containerBPMN' className={classes.viewerStyle} />
				<CustomCard className={classes.cardTab}>
					<ProtocolInfo processInfo={processInfo} />
				</CustomCard>
			</Box>
		</>
	);
};

export default ProtocolTypeViwer;
