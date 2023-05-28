import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function requireAuth<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
	return function WrappedComponent(props: P) {
		const { isAuthenticated } = useAuth();

		if (!isAuthenticated) return <Navigate to="/login" />;

		return <Component {...props} />;
	};
}
