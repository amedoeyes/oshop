import { useAuth0 } from "@auth0/auth0-react";

export default function requireAuth<P extends object>(
	Component: React.ComponentType<P>
): React.FC<P> {
	return function WrappedComponent(props: P) {
		const { isAuthenticated, loginWithRedirect } = useAuth0();

		if (!isAuthenticated) {
			loginWithRedirect({
				appState: { returnTo: window.location.pathname },
			});
			return <></>;
		}

		return <Component {...props} />;
	};
}
