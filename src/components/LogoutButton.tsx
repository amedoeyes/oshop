import { useAuth0 } from "@auth0/auth0-react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function LogoutButton() {
	const { logout } = useAuth0();
	return (
		<button onClick={() => logout()}>
			<LogoutRoundedIcon />
			Logout
		</button>
	);
}
