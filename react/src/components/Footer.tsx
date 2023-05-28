import { GitHub } from "@mui/icons-material";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a href="https://github.com/amedoeyes/oshop">
				<GitHub />
			</a>
		</footer>
	);
}
