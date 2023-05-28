import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;
		if (response.status === 401) {
			localStorage.removeItem("token");
			router.navigate("/login");
		}
		throw error;
	}
);

export default axiosClient;
