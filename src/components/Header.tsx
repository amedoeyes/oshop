import styles from "./Header.module.scss";
import Account from "./Account";
import { useEffect, useRef, useState } from "react";
import CartButton from "./CartButton";
import Logo from "./Logo";
import { Search } from "@mui/icons-material";
import SearchForm from "./SearchForm";

export default function Header() {
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let prevScrollY = window.scrollY;
		window.onscroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > prevScrollY) {
				headerRef.current?.classList.add(styles.scrolled);
			} else {
				headerRef.current?.classList.remove(styles.scrolled);
			}
			prevScrollY = currentScrollY;
		};

		return () => {
			window.onscroll = null;
		};
	}, []);

	return (
		<header ref={headerRef} className={styles.header}>
			<nav className={styles.headerNav}>
				<a href="/" className={styles.headerBrand}>
					<Logo />
				</a>
				<a href="/products" className={styles.headerLink}>
					Products
				</a>
			</nav>
			<SearchForm />
			<div className={styles.headerWrapper}>
				<Account />
				<CartButton />
			</div>
		</header>
	);
}
