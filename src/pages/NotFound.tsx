import styles from "./NotFound.module.scss";

export default function NotFound() {
	return (
		<div className={styles.notFound}>
			<h1>404</h1>
			<h2>Page not found</h2>
		</div>
	);
}
