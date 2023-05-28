import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import axiosClient from "../app/axiosClient";
import { _login, _logout } from "../features/auth/authSlice";
import router from "../app/router";

type RegisterValues = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

type LoginValues = {
	email: string;
	password: string;
};

export default function useAuth() {
	const dispatch = useDispatch<AppDispatch>();
	const { user, status } = useSelector((state: RootState) => state.auth);

	const isReady = status === "idle";
	const isAuthenticated = user !== null;

	const userHasRole = (role: string | string[]) => {
		if (!isAuthenticated) return false;

		if (Array.isArray(role)) {
			return role.includes(user!.role);
		}

		return user!.role === role;
	};

	const register = async (values: RegisterValues) => {
		try {
			await axiosClient.post("/auth/register", values);
		} catch (error) {
			throw error;
		}
	};

	const login = async (values: LoginValues) => {
		try {
			const response = await axiosClient.post("/auth/login", values);

			dispatch(_login(response.data));
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await axiosClient.post("/auth/logout");
		} catch (error) {
			throw error;
		}

		dispatch(_logout());
		router.navigate("/");
	};

	return { isReady, isAuthenticated, user, userHasRole, register, login, logout };
}
