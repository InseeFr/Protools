import React from 'react';

import { makeStyles } from 'tss-react/mui';
import {
	Card,
	Typography,
	Grid,
	Stack,
	CardContent,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';

const useStyles = makeStyles()((theme) => {
	return {
		infoName: {
			fontWeight: 'bold',
		},
		infoValue: {},
	};
});

const ProtocolInfo = (props) => {
	const classes = useStyles();
	const data = props.processInfo;

	return (
		<>
			<Card
				sx={{
					boxShadow: 0,
					textAlign: 'center',
					backgroundColor: 'secondary.pressed',
					borderRadius: 7,
					m: 1,
					width: '98%',
				}}
			>
				<CardContent className={classes.cardContent}>
					<Stack spacing={1}>
						<Grid item container xs={12} direction='row'>
							<Typography
								color='primary'
								variant='h6'
								className={classes.infoName}
							>
								Identifiant d'enquête:
							</Typography>
							<Typography
								color='primary'
								variant='body2'
								sx={{ marginLeft: 1 }}
							>
								{Object.keys(data)[0]}
							</Typography>
						</Grid>
						<Grid item container xs={12} direction='row'>
							<Typography
								color='primary'
								variant='h6'
								className={classes.infoName}
							>
								Nom de l'enquête:
							</Typography>
							<Typography
								color='primary'
								variant='body2'
								sx={{ marginLeft: 1 }}
							>
								{Object.entries(data)[0][1].title}
							</Typography>
						</Grid>
						<Grid item container xs={12} direction='row'>
							<Typography
								color='primary'
								variant='h6'
								className={classes.infoName}
							>
								Description:
							</Typography>
							<Typography
								color='primary'
								variant='body2'
								align='left'
								sx={{ marginLeft: 1 }}
							>
								{Object.entries(data)[0][1].description}
							</Typography>
						</Grid>
						<Grid item container xs={12} direction='row'>
							<Typography
								color='primary'
								variant='h6'
								className={classes.infoName}
							>
								Nombre de tâches manuelles:
							</Typography>
							<Typography
								color='primary'
								variant='body2'
								sx={{ marginLeft: 1 }}
							>
								{Object.entries(data)[0][1].tachesManu}
							</Typography>
						</Grid>
						<Grid item container xs={12} direction='row'>
							<Typography
								color='primary'
								variant='h6'
								className={classes.infoName}
							>
								Déroulement de l'enquête:
							</Typography>
						</Grid>
						<Grid item container xs={12} direction='row'>
							<List key={Object.entries(data)[0][1].variables} disablePadding>
								{Object.entries(data)[0][1].variables.map((item) => (
									<ListItem
										key={item.nom}
										sx={{
											paddingTop: '0',
											paddingBottom: '0',
											display: 'list-item',
										}}
									>
										<ListItemText
											primary={
												<Typography
													color='primary'
													variant='subtitle1'
													fontWeight='bold'
													className={classes.infoName}
												>
													{'\u2022'}
													{' ' + item.nom + ':'}
												</Typography>
											}
											secondary={
												<Typography
													color='primary'
													variant='subtitle1'
													fontWeight='normal'
													className={classes.infoName}
												>
													{item.description}
												</Typography>
											}
										/>
									</ListItem>
								))}
							</List>
						</Grid>
					</Stack>
				</CardContent>
			</Card>
		</>
	);
};

export default ProtocolInfo;
