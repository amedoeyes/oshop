import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Account.module.scss";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "./LogoutButton";
import placeHolder from "../assets/placeholder-account-picture.jpg";
import LoginButton from "./LoginButton";

export default function Account() {
	const { user, isAuthenticated } = useAuth0();
	const [showBox, setShowBox] = useState(false);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				boxRef.current &&
				!boxRef.current.contains(e.target as Node) &&
				e.target !== document.querySelector(`.${styles.accountPicture}`)
			) {
				setShowBox(false);
			}
		};

		let prevScrollY = window.scrollY;
		const handleScroll = () => {
			if (prevScrollY < window.scrollY) {
				setShowBox(false);
			}

			prevScrollY = window.scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleBox = () => setShowBox(!showBox);

	return (
		<div className={styles.account}>
			{isAuthenticated && (
				<p className={styles.accountMessage}>
					Welcome, {user!.nickname}
				</p>
			)}
			<div onClick={toggleBox}>
				<img
					src={isAuthenticated ? user!.picture : placeHolder}
					alt="account picture"
					className={styles.accountPicture}
				/>
			</div>
			{showBox && (
				<div ref={boxRef} className={styles.accountBox}>
					{isAuthenticated ? <LogoutButton /> : <LoginButton />}
				</div>
			)}
		</div>
	);
}
