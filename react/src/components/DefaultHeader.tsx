import Account from "./Account";
import CartButton from "./CartButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Link, Slide, Stack, Toolbar, Typography, useScrollTrigger } from "@mui/material";

type HideOnScrollProps = {
	children: React.ReactElement;
};

function HideOnScroll({ children }: HideOnScrollProps) {
	const isWindow = typeof window !== "undefined";

	const trigger = useScrollTrigger({
		target: isWindow ? window : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function DefaultHeader() {
	return (
		<HideOnScroll>
			<AppBar>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Stack direction="row" alignItems="center">
						<Link component={RouterLink} to="/" underline="none" mr={2} height="50px">
							<Stack direction="row" alignItems="center" spacing={1}>
								<Logo />
								<Typography variant="h5">OShop</Typography>
							</Stack>
						</Link>
						<Link component={RouterLink} to="/products" underline="none">
							Products
						</Link>
					</Stack>

					<SearchForm />

					<Stack direction="row" spacing={2}>
						<Account />
						<CartButton />
					</Stack>
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
}
