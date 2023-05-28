import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import DefaultHeader from "../../components/DefaultHeader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUser } from "../../features/auth/authSlice";
import { AppDispatch } from "../store";
import useAuth from "../../hooks/useAuth";

export default function DefaultLayout() {
	const { isAuthenticated } = useAuth();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated) dispatch(initializeUser());
	}, []);

	return (
		<>
			<DefaultHeader />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
