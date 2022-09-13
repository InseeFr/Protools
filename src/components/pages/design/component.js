import React from 'react';

//import Display from './bpmnDisplay';
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import { Grid, CardContent, Box, Typography } from '@mui/material';
import SelectBPMN from './selectBPMN';
import CustomCard from 'components/shared/styledComponents/card/card';
import Logo from 'components/shared/logo/logo';
import SideBar from '../../shared/sidepanel/sidepanel';

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
			width: '20%',
			marginLeft: '45%',
			marginTop: '10%',
			padding: 10,
			[theme.breakpoints.down('lg')]: {
				width: '30%',
				marginLeft: '40%',
			},
			[theme.breakpoints.down('md')]: {
				width: '30%',
				marginLeft: '38%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '85%',
				marginLeft: '5%',
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

		titleCard: {
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
	};
});

const Design = () => {
	// TODO : add file selector
	const { classes } = useStyles();
	return (
		<>
			<GlobalStyles
				styles={{
					body: {
						backgroundColor: '#F9FAFC',
					},
				}}
			/>
			<SideBar page='design' />
			<Grid container justify='center'>
				<Box className={classes.TitleHeader}>
					<Logo className={classes.logo} />
					<Typography variant='h3' className={classes.title}>
						Designer
					</Typography>
				</Box>
				<CustomCard className={classes.card}>
					<CardContent>
						<Typography value='h3' className={classes.titleCard}>
							Sélectionner un protocole BPMN:
						</Typography>
						<SelectBPMN />
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};
export default Design;
