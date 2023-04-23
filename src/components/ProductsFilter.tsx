import CategoryOptions from "./FilterCategoryOptions";
import FilterPriceRange from "./FilterPriceRange";
import FilterRatingOptions from "./FilterRatingOptions";
import styles from "./ProductsFilter.module.scss";

export default function ProductsFilter() {
	const toggleShowFilters = () => {
		if (window.innerWidth < 768) {
			document
				.querySelector(`.${styles.productsFilterOptions}`)
				?.classList.toggle(styles.show);
		}
	};

	return (
		<div className={styles.productsFilter}>
			<div
				className={styles.productsFilterHeader}
				onClick={toggleShowFilters}
			>
				<h2 className={styles.productsFilterTitle}>Filters</h2>
			</div>
			<div className={styles.productsFilterOptions}>
				<CategoryOptions />
				<FilterPriceRange />
				<FilterRatingOptions />
			</div>
		</div>
	);
}
