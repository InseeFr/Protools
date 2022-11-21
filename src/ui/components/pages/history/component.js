import React from 'react';
import { GlobalStyles } from 'tss-react';
import { Grid, Box, Typography } from '@mui/material';
//import Loader from 'ui/components/shared/loader/loader';
import { setAutoFreeze } from 'immer';
import { makeStyles } from 'tss-react/mui';
import Logo from 'ui/components/shared/logo/logo';
import SideBar from 'ui/components/shared/sidepanel/sidepanel';
import Footer from 'ui/components/shared/footer/component';
import TabBarHistory from './tabBar';

const useStyles = makeStyles()((theme) => {
	return {
		root: {
			body: {
				backgroundColor: theme.palette.background.default,
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
		gridItemProcessList: {
			textAlign: 'center',
		},
	};
});

const History = () => {
	setAutoFreeze(false);
	const { classes } = useStyles();
	// const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	// Temporary timer because my web service is too slow -> TODO : FIX IT
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 450);

	// }, []);
	// if (loading) {
	// 	return (
	// 		<>
	// 			<GlobalStyles
	// 				styles={{
	// 					body: {
	// 						backgroundColor: '#F9FAFC',
	// 					},
	// 				}}
	// 			/>

	// 			<Grid justifyContent='center'>
	// 				<Box className={classes.TitleHeader}>
	// 					<Logo className={classes.logo} />
	// 					<Typography variant='h3' className={classes.title}>
	// 						Historique
	// 					</Typography>
	// 				</Box>
	// 				<Loader />
	// 			</Grid>
	// 		</>
	// 	);
	// } else {
	return (
		<>
			<GlobalStyles
				styles={{
					body: {
						backgroundColor: '#F9FAFC',
					},
				}}
			/>
			<SideBar page='history' />
			<Grid justifyContent='center'>
				<Box className={classes.TitleHeader}>
					<Logo className={classes.logo} />
					<Typography variant='h3' className={classes.title}>
						Historique
					</Typography>
				</Box>
				<TabBarHistory />
			</Grid>
			<Footer />
		</>
	);
	//}
};

export default History;
