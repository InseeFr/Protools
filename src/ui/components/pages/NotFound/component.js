import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';
import { Grid, Button, Box, Typography } from '@mui/material';
import Logo from 'ui/components/shared/logo/logo';
import SideBar from '../../shared/sidepanel/sidepanel';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
			},
		},
		gridError: {
			marginLeft: '5%',
			marginTop: '15%',

			[theme.breakpoints.down('lg')]: {
				marginLeft: '5%',
			},
			[theme.breakpoints.down('md')]: {
				marginLeft: '5%',
			},
			[theme.breakpoints.down('sm')]: {
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
		titleCode: {
			fontWeight: 'bolder',
			color: theme.palette.primary.main,
		},
		codeMessage: {
			fontWeight: 'normal',
			color: theme.palette.primary.main,
		},
		gifPanda: {
			color: theme.palette.background.default,
		},
	};
});

const NotFound = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const navigationHandler = () => {
		navigate('/');
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
			<SideBar page='design' />
			<Grid container justify='center'>
				<Box className={classes.TitleHeader}>
					<Logo className={classes.logo} />
					<Typography variant='h3' className={classes.title}>
						Protools
					</Typography>
				</Box>
			</Grid>
			<Grid
				container
				className={classes.gridError}
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Typography variant='h1' className={classes.titleCode}>
					404
				</Typography>

				<Typography variant='h3' className={classes.codeMessage}>
					Page non trouvée 😕
				</Typography>
				<Typography variant='h6' className={classes.codeMessage}>
					La page que vos recherchez a visiblement disparu dans l'univers sombre
					et complexe des protocoles d'enquêtes. 🚀
				</Typography>
				<Typography variant='caption' className={classes.gifPanda}>
					Je voulais mettre un gif de panda de panda qui fait un salto arrière,
					mais la prod va probablement refuser, that's sad
				</Typography>
				<Button
					variant='outlined'
					onClick={navigationHandler}
					sx={{ marginTop: 2 }}
				>
					Retourner à l'accueil
				</Button>
			</Grid>
		</>
	);
};
export default NotFound;
