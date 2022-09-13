import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

const useStyles = makeStyles()((theme) => {
	return {
		tabWidth: {
			width: '98%',
		},
	};
});
export const TabPanel = (props) => {
	const classes = useStyles();
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			className={classes.tabWidth}
			{...other}
		>
			{children}
		</Typography>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

export const tabPropIndex = (index) => {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
};
