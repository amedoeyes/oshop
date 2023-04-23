import { Search } from "@mui/icons-material";
import styles from "./SearchForm.module.scss";
import { useEffect, useRef, useState } from "react";
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
	const searchRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLocalSearch(e.target.value);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (window.innerWidth < 768)
			searchRef.current?.classList.remove(styles.show);

		const pathname = window.location.pathname;

		if (pathname !== "/products") {
			if (!localSearch) return;
			navigate(`/products?search=${localSearch}`);
			dispatch(setSearch(localSearch));
			return;
		}

		dispatch(setSearch(localSearch));
		if (!localSearch) searchParams.delete("search");
		else searchParams.set("search", localSearch);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		if (window.innerWidth < 768) {
			const handleClick = (e: MouseEvent) => {
				if (
					searchRef.current &&
					!searchRef.current.contains(e.target as Node) &&
					!(e.target as HTMLElement).closest(
						`.${styles.mobileSearch}`
					)
				)
					searchRef.current?.classList.remove(styles.show);
			};

			let prevScrollY = window.scrollY;
			const handleScroll = () => {
				if (prevScrollY < window.scrollY)
					searchRef.current?.classList.remove(styles.show);

				prevScrollY = window.scrollY;
			};

			window.addEventListener("scroll", handleScroll);
			document.addEventListener("click", handleClick);

			return () => {
				window.removeEventListener("scroll", handleScroll);
				document.removeEventListener("click", handleClick);
			};
		}
	}, []);

	const toggleSearch = () => {
		searchRef.current?.classList.toggle(styles.show);
		(
			document.querySelector(`.${styles.searchInput}`) as HTMLElement
		).focus();
	};

	return (
		<>
			<div className={styles.mobileSearchContainer}>
				<Search
					className={styles.mobileSearch}
					onClick={toggleSearch}
				/>
			</div>
			<div ref={searchRef} className={styles.searchFormContainer}>
				<form className={styles.searchForm} onSubmit={handleSubmit}>
					<input
						className={styles.searchInput}
						type="text"
						value={localSearch}
						onChange={handleChange}
					/>
					<button className={styles.searchButton}>
						<Search />
					</button>
				</form>
			</div>
		</>
	);
}
