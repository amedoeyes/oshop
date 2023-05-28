import { useEffect, useState } from "react";
import placeHolder from "../assets/placeholder-account-picture.jpg";
import {
	Avatar,
	Box,
	Button,
	ClickAwayListener,
	Collapse,
	Skeleton,
	Stack,
	Typography,
	useScrollTrigger,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import UserHasRole from "./UserHasRole";
import router from "../app/router";

export default function Account() {
	const { isAuthenticated, user, isReady, logout } = useAuth();
	const [showBox, setShowBox] = useState(false);

	const handleLogout = async () => {
		await logout();
		router.navigate("/");
	};

	const trigger = useScrollTrigger({
		target: window,
	});

	useEffect(() => {
		if (trigger) setShowBox(false);
	}, [trigger]);

	if (!isReady)
		return (
			<Stack direction="row" alignItems="center" spacing={2}>
				<Skeleton
					variant="rectangular"
					width="13rem"
					height={20}
					sx={{
						borderRadius: "100rem",
						"@media (max-width: 950px)": {
							display: "none",
						},
					}}
				/>
				<Skeleton
					variant="rectangular"
					width={40}
					height={40}
					sx={{
						borderRadius: "100rem",
					}}
				/>
			</Stack>
		);

	return (
		<Stack direction="row" alignItems="center" spacing={2}>
			{isAuthenticated && (
				<Typography
					variant="body1"
					textOverflow="ellipsis"
					overflow="hidden"
					whiteSpace="nowrap"
					textAlign="end"
					width="13rem"
					sx={{
						"@media (max-width: 950px)": {
							display: "none",
						},
					}}
				>
					Welcome, {user!.name}
				</Typography>
			)}
			<Avatar
				alt="Account"
				src={placeHolder}
				sx={{
					cursor: "pointer",
				}}
				onClick={() => setShowBox(true)}
			/>
			<Collapse
				in={showBox}
				timeout="auto"
				unmountOnExit
				sx={{
					position: "absolute",
					top: "100%",
					right: 0,
					zIndex: 1,
				}}
			>
				<ClickAwayListener onClickAway={() => setShowBox(false)}>
					<Box
						bgcolor="background.paper"
						p={2}
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						gap={1}
						borderRadius="0 0 1rem 1rem"
					>
						{isAuthenticated ? (
							<>
								<Button variant="contained" onClick={handleLogout}>
									<Typography>Logout</Typography>
								</Button>

								<UserHasRole role={["admin", "vendor"]}>
									<Button variant="contained" component={Link} to="/dashboard">
										<Typography>Dashboard</Typography>
									</Button>
								</UserHasRole>
							</>
						) : (
							<>
								<Button variant="contained" component={Link} to="/login">
									<Typography>Login</Typography>
								</Button>
								<Button variant="contained" component={Link} to="/register">
									<Typography>Register</Typography>
								</Button>
							</>
						)}
					</Box>
				</ClickAwayListener>
			</Collapse>
		</Stack>
	);
}
