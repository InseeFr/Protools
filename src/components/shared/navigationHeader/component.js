/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useScrollTrigger } from '@mui/material';
import { FiUser, FiBook, FiMenu } from 'react-icons/fi';
import { makeStyles } from 'tss-react/mui';
import {
	Box,
	Stack,
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	Link,
	Slide,
	List,
	IconButton,
	ListItem,
} from '@mui/material';

const APPBAR_MOBILE = 50;
const APPBAR_DESKTOP = 60;

const useStyles = makeStyles()((theme) => {
	return {
		gridContainer: {
			display: 'flex',
			alignItems: 'center',
		},

		textHeader: {
			flex: 1,
			fontWeight: 'normal', //margin: 5,
			color: theme.palette.primary.main,
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
		iconsHeader: {
			flex: 1,
			color: theme.palette.primary.main,
			margin: 5,
			[theme.breakpoints.down('sm')]: {
				fontSize: 17,
			},
		},
		iconMenu: {
			color: theme.palette.primary.main,
			[theme.breakpoints.down('md')]: {
				fontSize: 17,
			},
		},
		drawer: {
			width: '15%',

			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	};
});

const RootStyle = styled(AppBar)(({ theme }) => ({
	boxShadow: 'none',
	backgroundColor: 'transparent',
	position: 'sticky',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
	minHeight: APPBAR_MOBILE,
	[theme.breakpoints.up('md')]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

const NavigationHeader = () => {
	const trigger = useScrollTrigger();
	const { classes } = useStyles();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<Slide appear={false} direction='down' in={!trigger}>
			<RootStyle>
				<ToolbarStyle>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='menu'
						onClick={() => setIsDrawerOpen(true)}
					>
						<FiMenu className={classes.iconMenu} />
					</IconButton>
					<Drawer
						open={isDrawerOpen}
						onClose={() => setIsDrawerOpen(false)}
						sx={{
							flexShrink: 0,
							'& .MuiDrawer-paper': {
								width: '30%',
								boxSizing: 'border-box',
							},
						}}
					>
						<List className={classes.drawer}>
							<ListItem>
								<Link href='/' underline='none'>
									<Typography
										variant='subtitle2'
										className={classes.textSidebar}
									>
										Accueil
									</Typography>
								</Link>
							</ListItem>
							<ListItem>
								<Link href='/process' underline='none'>
									<Box className={classes.boxBreakpoint}>
										<Typography
											variant='subtitle2'
											className={classes.textSidebar}
										>
											Workflows
										</Typography>
									</Box>
								</Link>
							</ListItem>
							<ListItem>
								<Link href='/history' underline='none'>
									<Box className={classes.boxBreakpoint}>
										<Typography
											variant='subtitle2'
											className={classes.textSidebar}
										>
											Historique
										</Typography>
									</Box>
								</Link>
							</ListItem>
							<ListItem>
								<Link href='/protocol-types' underline='none'>
									<Box className={classes.boxBreakpoint}>
										<Typography
											variant='subtitle2'
											className={classes.textSidebar}
										>
											Modélisation
										</Typography>
									</Box>
								</Link>
							</ListItem>
						</List>
					</Drawer>
					<Box sx={{ flexGrow: 1 }} />

					<Stack
						direction='row'
						alignItems='center'
						spacing={{ xs: 0.5, sm: 1.5 }}
					>
						<Box className={classes.gridContainer}>
							<FiUser className={classes.iconsHeader} />
							<Typography variant='caption' className={classes.textHeader}>
								FakeUser
							</Typography>
						</Box>
						<a
							href='https://protools-flowable-demo.dev.insee.io/swagger-ui/index.html'
							target='_blank'
							style={{ textDecoration: 'none' }}
							rel='noreferrer'
						>
							<Box className={classes.gridContainer}>
								<FiBook className={classes.iconsHeader} />
								<Typography variant='caption' className={classes.textHeader}>
									Documentation
								</Typography>
							</Box>
						</a>
					</Stack>
				</ToolbarStyle>
			</RootStyle>
		</Slide>
	);
};

export default NavigationHeader;
