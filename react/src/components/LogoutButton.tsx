import { Button, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";

export default function LogoutButton() {
	const { logout } = useAuth();

	const handleClick = async () => await logout();

	return (
		<Button
			variant="contained"
			sx={{
				borderRadius: "100rem",
			}}
			onClick={handleClick}
		>
			<Typography>Logout</Typography>
		</Button>
	);
}
