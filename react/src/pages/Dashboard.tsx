import DashboardHeader from "./../components/DashboardHeader";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
	return (
		<>
			<DashboardHeader />

			<Box p={2}>
				<Outlet />
			</Box>
		</>
	);
}
