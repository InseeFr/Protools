import React from 'react';
import { Grid, Link, Drawer, Typography, Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { FiHome, FiList, FiBarChart2, FiEdit } from 'react-icons/fi';

import Logo from '../logo/logo';

const useStyles = makeStyles()((theme) => {
	return {
		drawer: {
			width: '14%',
			[theme.breakpoints.down('md')]: {
				width: '5%',
			},
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
		drawerPaper: {
			'&&': {
				width: '14%',
				backgroundColor: theme.palette.background.default,
				[theme.breakpoints.down('md')]: {
					width: '8%',
				},
			},

			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
		boxBreakpoint: {
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},
		logo: {
			padding: 20,
		},
		titleSidebar: {
			//display: 'inline-block',
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		subTitleSidebar: {
			//display: 'inline-block',
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},

		textSidebar: {
			display: 'inline-block',
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		textSidebarMain: {
			display: 'inline-block',
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
		},
		iconMain: {
			marginLeft: 20,
			color: theme.palette.secondary.main,
			[theme.breakpoints.down('md')]: {
				fontSize: 19,
				marginLeft: 15,
			},
		},
		icon: {
			marginLeft: 20,
			color: theme.palette.primary.main,
			[theme.breakpoints.down('md')]: {
				fontSize: 19,
				marginLeft: 15,
			},
		},
	};
});

const SideBar = (props) => {
	const { classes } = useStyles();

	const pageActuelle = props.page;
	return (
		<>
			<Drawer
				sx={{
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: '12%',
						boxSizing: 'border-box',
					},
				}}
				variant='permanent'
				anchor='left'
				classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
			>
				<Grid
					container
					spacing={2}
					sx={{
						marginTop: 3,
						marginBottom: 5,
						marginLeft: { sm: '28%', md: '12%' },
					}}
				>
					<Logo className={classes.logo} />
					<Box className={classes.boxBreakpoint}>
						<Typography variant='h5' className={classes.titleSidebar}>
							Protools
						</Typography>
						<Typography variant='subtitle2' className={classes.subTitleSidebar}>
							Suivi & orchestration <br /> des enquêtes
						</Typography>
					</Box>
				</Grid>

				<Grid
					container
					direction='column'
					justifyContent='flex-start'
					alignContent='flex-start'
					spacing={3}
					sx={{ marginLeft: { sm: '25%', md: '8%' } }}
				>
					<Link href='/' underline='none'>
						<Grid
							container
							direction='row'
							spacing={1}
							sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}
						>
							<FiHome
								className={
									pageActuelle === 'home' ? classes.iconMain : classes.icon
								}
							/>
							<Box className={classes.boxBreakpoint}>
								<Typography
									variant='subtitle1'
									className={
										pageActuelle === 'home'
											? classes.textSidebarMain
											: classes.textSidebar
									}
								>
									Accueil
								</Typography>
							</Box>
						</Grid>
					</Link>

					<Link href='/process' underline='none'>
						<Grid
							container
							direction='row'
							spacing={1}
							sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}
						>
							<FiList
								className={
									pageActuelle === 'process' ? classes.iconMain : classes.icon
								}
							/>
							<Box className={classes.boxBreakpoint}>
								<Typography
									variant='subtitle1'
									className={
										pageActuelle === 'process'
											? classes.textSidebarMain
											: classes.textSidebar
									}
								>
									Lancer une enquête
								</Typography>
							</Box>
						</Grid>
					</Link>
					<Link href='/history' underline='none'>
						<Grid
							container
							direction='row'
							spacing={1}
							sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}
						>
							<FiBarChart2
								className={
									pageActuelle === 'history' ? classes.iconMain : classes.icon
								}
							/>
							<Box className={classes.boxBreakpoint}>
								<Typography
									variant='subtitle1'
									className={
										pageActuelle === 'history'
											? classes.textSidebarMain
											: classes.textSidebar
									}
								>
									Historique
								</Typography>
							</Box>
						</Grid>
					</Link>
					{/* <Link href='/admin' underline='none'>
						<Grid
							container
							direction='row'
							spacing={1}
							sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}
						>
							<FiCpu
								className={
									pageActuelle === 'admin' ? classes.iconMain : classes.icon
								}
							/>
							<Box className={classes.boxBreakpoint}>
								<Typography
									variant='subtitle1'
									className={
										pageActuelle === 'admin'
											? classes.textSidebarMain
											: classes.textSidebar
									}
								>
									Admin
								</Typography>
							</Box>
						</Grid>
					</Link> */}
					<Link href='/protocol-types' underline='none'>
						<Grid
							container
							direction='row'
							spacing={1}
							sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}
						>
							<FiEdit
								className={
									pageActuelle === 'design' ? classes.iconMain : classes.icon
								}
							/>
							<Box className={classes.boxBreakpoint}>
								<Typography
									variant='subtitle1'
									className={
										pageActuelle === 'design'
											? classes.textSidebarMain
											: classes.textSidebar
									}
								>
									Visualisation protocoles
								</Typography>
							</Box>
						</Grid>
					</Link>
				</Grid>
			</Drawer>
		</>
	);
};

export default SideBar;
