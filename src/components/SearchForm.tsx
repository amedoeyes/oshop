import { Search } from "@mui/icons-material";
import styles from "./SearchForm.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setSearch } from "../features/filter/filterOptionsSlice";

export default function SearchForm() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const { options } = useSelector((state: RootState) => state.filterOptions);
	const navigate = useNavigate();
	const [localSearch, setLocalSearch] = useState(options.search || "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLocalSearch(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const pathname = window.location.pathname;

		if (pathname !== "/products") {
			navigate(`/products?search=${localSearch}`);
			dispatch(setSearch(localSearch));
			return;
		}

		dispatch(setSearch(localSearch));
		searchParams.set("search", localSearch);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		if (window.innerWidth < 768) {
			let prevScrollY = window.scrollY;
			const handleScroll = () => {
				if (prevScrollY < window.scrollY) {
					document
						.querySelector(`.${styles.searchFormContainer}`)
						?.classList.remove(styles.show);
				}

				prevScrollY = window.scrollY;
			};

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);

	const toggleSearch = () => {
		document
			.querySelector(`.${styles.searchFormContainer}`)
			?.classList.toggle(styles.show);

		(
			document.querySelector(`.${styles.searchInput}`) as HTMLElement
		).focus();
	};

	const handleBlur = () => {
		document
			.querySelector(`.${styles.searchFormContainer}`)
			?.classList.remove(styles.show);
	};

	return (
		<>
			<div className={styles.mobileSearchContainer}>
				<div className={styles.mobileSearch} onClick={toggleSearch}>
					<Search />
				</div>
			</div>
			<div className={styles.searchFormContainer}>
				<form className={styles.searchForm} onSubmit={handleSubmit}>
					<input
						className={styles.searchInput}
						type="text"
						value={localSearch}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<button className={styles.searchButton}>
						<Search />
					</button>
				</form>
			</div>
		</>
	);
}
