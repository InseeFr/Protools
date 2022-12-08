/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	TextField,
	CardContent,
	Grid,
	Box,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from '@mui/material';
import SideBar from 'ui/components/shared/sidepanel/sidepanel';
import CustomCard from 'ui/components/shared/styledComponents/card/card';
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import Logo from 'ui/components/shared/logo/logo';
import { temporaryExecuteTask } from 'core/utils/dataProcess/processExecution';
import { fetchConfig } from 'core/config';

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
const ReviewUserTask = () => {
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

	const handleClose = () => {
		setOpen(false);
		window.location.replace('/ ', '_blank');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchConfig().then((config) => {
			const API_URL = config.API_URL;
			temporaryExecuteTask(API_URL, taskID, {});
			handleClickOpen();
		});
	};

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
						<Typography value='h3' sx={{ marginTop: 1, color: 'primary.main' }}>
							Cette tâche ne requiert pas d'action particulière, le bouton
							suivant permet d'exécuter la tâche.
						</Typography>
						<Button
							variant='outlined'
							sx={{ marginTop: 3 }}
							onClick={navigate(-1)}
						>
							<Typography value='h3'>Annuler</Typography>
						</Button>
						<Button
							variant='contained'
							sx={{ marginTop: 3, marginLeft: 1 }}
							onClick={handleSubmit}
						>
							<Typography value='h3'>Envoyer</Typography>
						</Button>

						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>
								<Typography variant='h4'>Task Service</Typography>
							</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Commande lancée avec succès, retour au menu principal.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button variant='contained' onClick={handleClose} autoFocus>
									Ok
								</Button>
							</DialogActions>
						</Dialog>
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};
export default ReviewUserTask;
