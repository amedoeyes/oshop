import { Button, Typography } from "@mui/material";

export default function LoginButton() {
	return (
		<Button
			href="/login"
			variant="contained"
			sx={{
				borderRadius: "100rem",
			}}
		>
			<Typography>Login</Typography>
		</Button>
	);
}
