import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	Grid,
	Box,
	Typography,
	CardContent,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from '@mui/material';
import CustomCard from 'components/shared/styledComponents/card/card';
import Logo from 'components/shared/logo/logo';
import { GlobalStyles } from 'tss-react';
import SideBar from 'components/shared/sidepanel/sidepanel';
import { uploadFileToProcess } from 'utils/dataProcess/processExecution';

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
			width: '23%',
			marginLeft: '45%',
			marginTop: '10%',
			padding: 10,
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
			fontSize: 22,
			margin: '0px 0px 10px 0px',
		},
	};
});
// TODO : Refaire le form en MUI, pour l'instant ça marche pas...
const UploadFile = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	const [files, setFiles] = useState(null);
	const [open, setOpen] = useState(false);
	const state = useLocation().state;
	const taskID = state.taskID;

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('file uploaded : ', files);
		uploadFileToProcess(files, taskID);
		setOpen(true);
	};
	const handleChange = (event) => {
		setFiles(event.target.files[0]);
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
						Télécharger un fichier
					</Typography>
				</Box>
				<CustomCard className={classes.card}>
					<CardContent>
						<Typography value='h3' className={classes.titleCard}>
							Déposez ici le fichier à télécharger:
						</Typography>

						<form onSubmit={handleSubmit}>
							<input type='file' onChange={handleChange} />
							<Button
								variant='contained'
								sx={{ marginTop: 3 }}
								onClick={handleSubmit}
							>
								<Typography value='h3'>Envoyer</Typography>
							</Button>
						</form>
					</CardContent>
				</CustomCard>
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<Typography variant='h4'>Task Service</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Commande lancée avec succès, retour au suivi du processus.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' onClick={handleClose} autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UploadFile;
