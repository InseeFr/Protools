import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Logo from '../logo/logo';

const useStyles = makeStyles()((theme) => {
	return {
		title: {
			marginLeft: 10,
			fontWeight: 'bold',
			color: theme.palette.primary.main,
		},
		logo: {
			verticalAlign: 'middle',
		},
	};
});
export const HeaderTitlePage = (props) => {
	const name = props.name;
	const classes = useStyles();
	return (
		<>
			<Logo className={classes.logo} />
			<span className={classes.title}>{name}</span>
		</>
	);
};
