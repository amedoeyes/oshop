import { Button, Typography } from "@mui/material";

export default function RegisterButton() {
	return (
		<Button
			href="/register"
			variant="contained"
			sx={{
				borderRadius: "100rem",
			}}
		>
			<Typography>Register</Typography>
		</Button>
	);
}
