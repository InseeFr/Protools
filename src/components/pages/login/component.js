// @ts-ignore
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
	Grid,
	// @ts-ignore
	Link,
	CardContent,
	// @ts-ignore
	TextField,
	Button,
	Box,
	InputAdornment,
	IconButton,
	Stack,
	Checkbox,
} from '@mui/material';
import CustomCard from 'components/shared/styledComponents/card/card';
import Logo from 'components/shared/logo/logo';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GlobalStyles } from 'tss-react';

// @ts-ignore
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
			width: '30%',
			marginLeft: '45%',
			marginTop: '10%',
		},
		TitleHeader: {
			//margin: 5,
			marginTop: 5,
			marginBottom: 20,
			position: 'relative',
		},
		logo: {
			verticalAlign: 'middle',
		},
		titleCard: {
			position: 'absolute',
			top: '25%',
			left: '25%',
			marginLeft: 10,
			fontSize: 24,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		TextField: {
			height: '10%',
			color: theme.palette.primary.main,
			background: '#fcfdfe',
			borderRadius: 20,
			fontSize: 10,
		},
		inputTitle: {
			alignItems: 'center',
			fontSize: 18,
			fontWeight: 'bold',
			marginTop: 20,
			color: theme.palette.primary.main,
		},
		loginButton: {
			fontSize: '14px',
			marginTop: 20,
			backgroundColor: theme.palette.secondary.main,
			'&:hover': {
				backgroundColor: theme.palette.secondary.main,
			},
			fontWeight: 'bold',
			borderRadius: 15,
		},
		remindsMe: {
			fontSize: '11px',
		},
		flex: {
			display: 'flex',
			alignItems: 'center',
		},
	};
});
const Login = () => {
	const { classes } = useStyles();
	const [email, setEmail] = useState('');
	// @ts-ignore
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	// @ts-ignore
	function handleSubmit(event) {
		console.log('Connexion attempt');
		console.log('email:', email);
		console.log('password', password);
	}
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
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
			<Grid container justify='center'>
				<CustomCard className={classes.card}>
					<CardContent>
						<div className={classes.TitleHeader}>
							<Logo
								// @ts-ignore
								className={classes.logo}
							/>
							<span className={classes.titleCard}>Connexion</span>
						</div>
						<Stack spacing={3} alignItems='center'>
							<Box
								sx={{
									marginTop: 2,
									width: '120%',
								}}
							>
								<span className={classes.inputTitle}>Email:</span>
								<br />
								<TextField
									fullWidth
									className={classes.TextField}
									id='email'
									variant='standard'
									label='Adresse Email'
									type='email'
									sx={{
										'& label.Mui-focused': {
											display: 'none',
										},
										'& legend': {
											display: 'none',
										},
									}}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Box>
							<Box sx={{ marginTop: 2, marginBottom: 6, width: '120%' }}>
								<span className={classes.inputTitle}>
									Mot de passe: <br />
								</span>
								<TextField
									fullWidth
									className={classes.TextField}
									id='password'
									variant='standard'
									label='Mot de passe'
									type={showPassword ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge='end'
												>
													{showPassword ? (
														<FiEyeOff size={20} />
													) : (
														<FiEye size={20} />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
									sx={{
										'& label.Mui-focused': {
											display: 'none',
										},
										'& legend': {
											display: 'none',
										},
									}}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Box>
							<Grid
								container
								alignItems='baseline'
								justifyContent='space-between'
								sx={{ width: '120%' }}
							>
								<Grid item>
									<Checkbox
										sx={{
											color: 'secondary',
											'&.Mui-checked': {
												color: 'secondary',
											},
											padding: 0.5,
										}}
										size='small'
									/>
									<span className={classes.remindsMe}>Se souvenir de moi</span>
								</Grid>
								<Link
									to='/reset-password'
									className={classes.remindsMe}
									color='secondary'
								>
									Mot de passe oublié
								</Link>
							</Grid>
						</Stack>
						<Box textAlign='center'>
							<Button
								disableElevation
								variant='contained'
								className={classes.loginButton}
								onClick={() => handleSubmit()}
								sx={{
									justifyContent: 'center',
									paddingLeft: 3,
									paddingRight: 3,
								}}
							>
								Connexion
							</Button>
						</Box>
					</CardContent>
				</CustomCard>
			</Grid>
		</>
	);
};

export default Login;
