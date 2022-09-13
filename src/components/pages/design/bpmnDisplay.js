import React, { useRef } from 'react';
//import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { makeStyles } from 'tss-react/mui';
import { Box, Typography } from '@mui/material';
import CustomCard from 'components/shared/styledComponents/card/card';

import { GlobalStyles } from 'tss-react';
import Logo from 'components/shared/logo/logo';
import SideBar from 'components/shared/sidepanel/sidepanel';
//import { emptyBPMN } from 'utils/mockData';
import CustomModeler from './bpmnModeler';

const useStyles = makeStyles()((theme) => {
	return {
		modelerStyle: {
			backgroundColor: '#FFFF',
			border: `1px solid ${theme.palette.primary.main}`,
			height: '85vh',
			width: '82vw',
			position: 'absolute',
			top: '12%',
			left: '15%',
			zIndex: 1,
			[theme.breakpoints.down('md')]: {
				width: '84%',
				left: '12%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '90%',
				left: '5%',
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
	};
});
//TODO : add header (save, update, etc...) + Custom flowable options
const Display = (props) => {
	const { classes } = useStyles();
	const params = useLocation();
	const url = params.state.selected;

	const bpmContainerRef = useRef();
	console.log(bpmContainerRef);

	// import is fired only once

	return (
		<Box>
			<GlobalStyles
				styles={{
					body: {
						backgroundColor: '#F9FAFC',
					},
				}}
			/>
			<SideBar page='design' />
			<Box className={classes.TitleHeader}>
				<Logo className={classes.logo} />
				<Typography variant='h3' className={classes.title}>
					Designer
				</Typography>
			</Box>
			<CustomCard className={classes.modelerStyle}>
				<CustomModeler url={url} />
			</CustomCard>
		</Box>
	);
};

export default Display;
