import { AppBar, Link, Stack, Tab, TabProps, Tabs, TabsProps, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Account from "./Account";
import useAuth from "../hooks/useAuth";
import UserHasRole from "./UserHasRole";

type LinkTabProps = {
	to: string;
} & TabProps;

function LinkTab({ to, ...props }: LinkTabProps) {
	//@ts-ignore
	return <Tab component={RouterLink} to={to} {...props} />;
}

function DashboardTabs({ ...props }: TabsProps) {
	const { userHasRole } = useAuth();
	const pathname = useLocation().pathname.split("/")[2] || "dashboard";

	return (
		<Tabs value={pathname} variant="scrollable" {...props}>
			<LinkTab to="/dashboard" value="dashboard" label="Overview" />
			<LinkTab to="products" value="products" label="Products" />

			{userHasRole("admin") && <LinkTab to="users" value="users" label="Users" />}
		</Tabs>
	);
}

export default function DashboardHeader() {
	return (
		<>
			<AppBar position="static">
				<Toolbar
					sx={{
						justifyContent: "space-between",
					}}
				>
					<Stack direction="row" spacing={1}>
						<Link component={RouterLink} to="/" height="50px">
							<Logo />
						</Link>
						<Stack justifyContent="center">
							<Typography variant="h5" lineHeight={1}>
								OShop
							</Typography>
							<Typography variant="subtitle1" lineHeight={1}>
								Dashboard
							</Typography>
						</Stack>
						<DashboardTabs
							sx={{
								"@media (max-width: 768px)": {
									display: "none",
								},
							}}
						/>
					</Stack>

					<Account />
				</Toolbar>
			</AppBar>

			<DashboardTabs
				sx={{
					"@media (min-width: 769px)": {
						display: "none",
					},
				}}
			/>
		</>
	);
}
