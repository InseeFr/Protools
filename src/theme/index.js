/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes, pxToRem } from './typography';
import shadows from './shadows';

const PRIMARY = {
	mainText: '#555B6E',
	background: '#F9FAFC',
};
const SECONDARY = {
	secondGreen: '#89B0AE',
	pressedGrey: '#F8FAF8',
};

const borderWidth = 2;

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 700,
			md: 1200,
			lg: 1500,
			xl: 1836,
		},
	},
	palette: {
		common: { black: '#343a40', white: '#fff' },
		primary: { main: PRIMARY.mainText },
		secondary: { main: SECONDARY.secondGreen, pressed: SECONDARY.pressedGrey },
		background: {
			default: PRIMARY.background,
		},
		warning: { main: '#d1495b', light: '#fed9b7' },
		border: {
			borderColor: SECONDARY.secondGreen,
			borderWidth: borderWidth,
		},

		contrastThreshold: 3,

		tonalOffset: 0.2,
	},
	shadows,
	typography: {
		h1: {
			fontWeight: 700,
			lineHeight: 80 / 64,
			fontSize: pxToRem(40),
			...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
		},
		h2: {
			fontWeight: 700,
			lineHeight: 64 / 48,
			fontSize: pxToRem(32),
			...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
		},
		h3: {
			fontWeight: 700,
			lineHeight: 1.5,
			fontSize: pxToRem(18),
			...responsiveFontSizes({ sm: 24, md: 30, lg: 32 }),
		},
		h4: {
			fontWeight: 700,
			lineHeight: 1.5,
			fontSize: pxToRem(16),
			...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
		},
		h5: {
			fontWeight: 700,
			lineHeight: 1.5,
			fontSize: pxToRem(18),
			...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
		},
		h6: {
			fontWeight: 700,
			lineHeight: 28 / 18,
			fontSize: pxToRem(16),
			...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
		},
		subtitle1: {
			fontWeight: 600,
			lineHeight: 1.5,
			fontSize: pxToRem(16),
		},
		subtitle2: {
			fontWeight: 600,
			lineHeight: 22 / 14,
			fontSize: pxToRem(14),
		},
		body1: {
			lineHeight: 1.5,
			fontSize: pxToRem(16),
			...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
		},
		body2: {
			lineHeight: 22 / 14,
			fontSize: pxToRem(14),
			...responsiveFontSizes({ sm: 16, md: 17, lg: 17 }),
		},
		caption: {
			lineHeight: 1.5,
			fontSize: pxToRem(11),
			...responsiveFontSizes({ sm: 12, md: 13, lg: 13 }),
		},
		overline: {
			fontWeight: 700,
			lineHeight: 1.5,
			fontSize: pxToRem(12),
			letterSpacing: 1.1,
			textTransform: 'uppercase',
		},
		button: {
			fontWeight: 700,
			lineHeight: 24 / 14,
			fontSize: pxToRem(14),
			textTransform: 'capitalize',
		},
	},
	props: {
		MuiButton: {
			disableElevation: true,
			variant: 'contained',
		},
	},
	overrides: {},
	components: {
		MuiInputLabel: {
			styleOverrides: {
				label: {
					color: PRIMARY.mainText,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: PRIMARY.mainText,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: PRIMARY.mainText,
					'&::before': PRIMARY.mainText,
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					color: PRIMARY.mainText,
					'& h6': {
						color: 'red',
					},
				},
			},
		},
		MuiDialogContentText: {
			styleOverrides: {
				root: {
					color: PRIMARY.mainText,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: shadows[2],
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					'&:active': {
						boxShadow: 'inset 0px 4px 4px rgba(0, 40, 56, 0.30)',
					},
				},
			},
		},
	},
});
export default theme;
