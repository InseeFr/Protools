/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, CardContent, Grid, Box, Typography } from '@mui/material';
import SideBar from 'components/shared/sidepanel/sidepanel';
import CustomCard from 'components/shared/styledComponents/card/card';
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import Logo from 'components/shared/logo/logo';
import FormComponent from './formContent';
import { getVariables } from 'utils/dataProcess/fetchDataProcess';
import { temporaryExecuteTask } from 'utils/dataProcess/processExecution';
import FormView from './formView';
import NoVariablesViews from './noVariablesView';
import FormContentPQV from './fromContentPQV';

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
			width: '28%',
			marginLeft: '40%',
			marginTop: '10%',
			padding: 10,
			[theme.breakpoints.down('lg')]: {
				width: '30%',
				marginLeft: '40%',
			},
			[theme.breakpoints.down('md')]: {
				width: '50%',
				marginLeft: '27%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '60%',
				marginLeft: '20%',
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
const FormVariables = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const state = useLocation().state;
	const [open, setOpen] = useState(false);

	const id = state.id;
	const variables = state.variables;
	console.log('Manual task variables ', variables);

	const taskName = state.taskName;
	const taskID = state.taskID;

	const handleClickOpen = () => {
		setOpen(true);
	};

	switch (taskName) {
		case 'Fill survey info':
			return (
				<>
					<GlobalStyles
						styles={{
							body: {
								backgroundColor: '#F9FAFC',
							},
						}}
					/>
					<SideBar page='form' />
					<Grid container justify='center'>
						<Box className={classes.TitleHeader}>
							<Logo className={classes.logo} />
							<Typography variant='h3' className={classes.title}>
								Déclaration des variables
							</Typography>
						</Box>
						<CustomCard className={classes.card}>
							<CardContent>
								<Typography value='h3' className={classes.titleCard}>
									Définition des variables d'enquête:
								</Typography>
								<FormComponent taskName={taskName} taskID={taskID} />
							</CardContent>
						</CustomCard>
					</Grid>
				</>
			);
		case 'Entrées Informations (contrôle)':
			return (
				<>
					<GlobalStyles
						styles={{
							body: {
								backgroundColor: '#F9FAFC',
							},
						}}
					/>
					<SideBar page='form' />
					<Grid container justify='center'>
						<Box className={classes.TitleHeader}>
							<Logo className={classes.logo} />
							<Typography variant='h3' className={classes.title}>
								Vérification des variables
							</Typography>
						</Box>
						<CustomCard className={classes.card}>
							<CardContent>
								<Typography value='h3' className={classes.titleCard}>
									Les informations rentrées sont elles correctes ?
								</Typography>
								<FormContentPQV
									taskName={taskName}
									taskID={taskID}
									variables={variables}
								/>
							</CardContent>
						</CustomCard>
					</Grid>
				</>
			);
		default:
			console.log('default render case');
			return (
				<>
					<GlobalStyles
						styles={{
							body: {
								backgroundColor: '#F9FAFC',
							},
						}}
					/>
					<SideBar page='form' />
					<Grid container justify='center'>
						<Box className={classes.TitleHeader}>
							<Logo className={classes.logo} />
							<Typography variant='h3' className={classes.title}>
								Tâche manuelle sans variables
							</Typography>
						</Box>
						<CustomCard className={classes.card}>
							<CardContent>
								<Typography value='h3' className={classes.titleCard}>
									Tâche manuelle : {taskName}
								</Typography>
								<NoVariablesViews taskID={taskID} />
							</CardContent>
						</CustomCard>
					</Grid>
				</>
			);
	}
};
export default FormVariables;
