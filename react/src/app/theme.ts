import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = (mode: PaletteMode, primary: string, secondary: string) =>
	createTheme({
		palette: {
			mode: mode,
			background: {
				default: secondary,
				paper: secondary,
			},
			text: {
				primary: primary,
			},
			primary: {
				main: primary,
			},
			secondary: {
				main: secondary,
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: "100rem",
					},
				},
			},
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true,
				},
			},
			MuiIconButton: {
				defaultProps: {
					color: "primary",
				},
			},
			MuiRating: {
				styleOverrides: {
					iconFilled: {
						color: primary,
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: "1rem",
						backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
					},
				},
			},
			MuiAppBar: {
				defaultProps: {
					color: "secondary",
					elevation: 0,
				},
				styleOverrides: {
					root: {
						padding: ".5rem",
						borderRadius: "0",
						backgroundImage: "none",
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					indicator: {
						backgroundColor: primary,
						width: "100%",
						height: "100%",
						opacity: 0.075,
						borderRadius: "100rem",
						pointerEvents: "none",
					},
				},
			},
		},
	});

const themes = {
	light: theme("light", "#000", "#fff"),
	dark: theme("dark", "#fff", "#000"),
};

export default themes;
