import { useAuth0 } from "@auth0/auth0-react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export default function LoginButton() {
	const { loginWithRedirect } = useAuth0();

	return (
		<button onClick={() => loginWithRedirect()}>
			<LoginRoundedIcon />
			Log In
		</button>
	);
}
