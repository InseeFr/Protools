import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import theme from 'theme';

// Donut Chart Component using ChartJS library
const DoughnutChart = (props) => {
	const data = props.data;
	ChartJS.register(ArcElement, Tooltip);
	const dataNumber = props.data.datasets[0].data.reduce(
		(partialSum, a) => partialSum + a,
		0
	);
	const plugins = [
		{
			beforeDraw: function (chart) {
				var width = chart.width,
					height = chart.height,
					ctx = chart.ctx;
				ctx.restore();
				var fontSize = (height / 85).toFixed(2);
				ctx.font = fontSize + 'em sans-serif';

				ctx.textBaseline = 'top';
				var text = dataNumber,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2.4;
				ctx.fillStyle = theme.palette.primary.main;
				ctx.fillText(text, textX, textY);
				ctx.save();
			},
		},
	];
	const options = {
		responsive: true,
		legend: {
			display: true,
			position: 'bottom',
		},
		label: {
			display: true,
		},
	};

	return (
		<Box
			sx={{
				width: {
					xs: 70, // theme.breakpoints.up('xs')
					sm: 105, // theme.breakpoints.up('sm')
					md: 120, // theme.breakpoints.up('md')
					lg: 140, // theme.breakpoints.up('lg')
					xl: 150, // theme.breakpoints.up('xl')
				},
				marginTop: 2,
				marginLeft: 3,
				marginRight: 3,
			}}
		>
			<Doughnut data={data} options={options} plugins={plugins} />
		</Box>
	);
};
export default DoughnutChart;
