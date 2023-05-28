import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { User } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { initializeUser } from "../../features/auth/authSlice";
import { Box, CircularProgress, Stack } from "@mui/material";
import Logo from "../../components/Logo";

type AuthorizedLayoutProps = {
	role: User["role"] | User["role"][];
};

export default function AuthorizedLayout({ role }: AuthorizedLayoutProps) {
	const { isReady, isAuthenticated, userHasRole } = useAuth();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated) dispatch(initializeUser());
	}, []);

	if (!isReady)
		return (
			<Box
				width="100%"
				height="100vh"
				bgcolor="background.default"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Stack alignItems="center" spacing={4}>
					<Logo width={150} height={150} />
					<CircularProgress size={50} />
				</Stack>
			</Box>
		);

	if (!isAuthenticated) return <Navigate to="/login" />;

	if (!userHasRole(role)) return <Navigate to="/" replace />;

	return <Outlet />;
}
