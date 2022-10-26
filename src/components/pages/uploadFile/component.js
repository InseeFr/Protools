import React, { useState, useRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Grid, Box, Typography, CardContent, Button } from '@mui/material';
import CustomCard from 'components/shared/styledComponents/card/card';
import Logo from 'components/shared/logo/logo';
import { GlobalStyles } from 'tss-react';
import SideBar from 'components/shared/sidepanel/sidepanel';

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

	const [files, setFiles] = useState(null);
	const inputRef = useRef();

	function handleSubmit(event) {
		console.log('File submit');
		console.log('file uploaded : ', files);
	}
	function handleChange(event) {
		setFiles(event.target.files[0]);
	}

	// send files to the server // learn from my other video
	const handleUpload = () => {
		const formData = new FormData();
		formData.append('Files', files);
		console.log(formData.getAll());
		// fetch(
		//   "link", {
		//     method: "POST",
		//     body: formData
		//   }
		// )
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
								onClick={() => handleSubmit()}
							>
								<Typography value='h3'>Envoyer (coucou c'est sale) </Typography>
							</Button>
						</form>
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};

export default UploadFile;
