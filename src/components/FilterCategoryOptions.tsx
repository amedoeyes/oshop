import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterCategoryOptions.module.scss";
import { AppDispatch, RootState } from "../app/store";
import { setCategory } from "../features/filter/filterOptionsSlice";
import { useSearchParams } from "react-router-dom";

const categoryOptions = [
	{
		name: "Electronics",
		subcategories: [
			{ name: "Smartphones", value: "smartphones" },
			{ name: "Laptops", value: "laptops" },
		],
	},
	{
		name: "Beauty",
		subcategories: [
			{ name: "Fragrances", value: "fragrances" },
			{ name: "Skincare", value: "skincare" },
		],
	},
	{
		name: "Home",
		subcategories: [
			{ name: "Groceries", value: "groceries" },
			{ name: "Furniture", value: "furniture" },
			{ name: "Home Decoration", value: "home-decoration" },
			{ name: "Lighting", value: "lighting" },
		],
	},
	{
		name: "Fashion",
		subcategories: [
			{ name: "Tops", value: "tops" },
			{ name: "Mens Shirts", value: "mens-shirts" },
			{ name: "Mens Shoes", value: "mens-shoes" },
			{ name: "Mens Watches", value: "mens-watches" },
			{ name: "Womens Dresses", value: "womens-dresses" },
			{ name: "Womens Shoes", value: "womens-shoes" },
			{ name: "Womens Watches", value: "womens-watches" },
			{ name: "Womens Bags", value: "womens-bags" },
			{ name: "Womens Jewellery", value: "womens-jewellery" },
			{ name: "Sunglasses", value: "sunglasses" },
		],
	},
	{
		name: "Automotive",
		subcategories: [
			{ name: "Automotive", value: "automotive" },
			{ name: "Motorcycle", value: "motorcycle" },
		],
	},
];

export default function FilterCategoryOptions() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const { options } = useSelector((state: RootState) => state.filterOptions);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		dispatch(setCategory(value));

		if (value === "all") searchParams.delete("category");
		else searchParams.set("category", value);
		setSearchParams(searchParams);
	};
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLLabelElement | HTMLDivElement>
	) => {
		if (e.key === "Enter") e.currentTarget.click();
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) =>
		e.currentTarget.parentElement
			?.getElementsByClassName(
				styles.filterCategoryOptionsSubcategories
			)[0]
			.classList.toggle(styles.show);

	return (
		<div className={styles.filterCategoryOptions}>
			<h3 className={styles.filterCategoryOptionsTitle}>Categories</h3>
			<div className={styles.filterCategoryOption}>
				<input
					className={styles.filterCategoryOptionInput}
					type="radio"
					id="all"
					name="category"
					value="all"
					onChange={handleChange}
					checked={options.category === "all"}
				/>
				<label
					className={styles.filterCategoryOptionLabel}
					htmlFor="all"
					tabIndex={0}
					onKeyDown={handleKeyDown}
				>
					All
				</label>
			</div>
			{categoryOptions.map((category) => (
				<div
					className={styles.filterCategoryOptionsCategory}
					key={category.name}
				>
					<h4
						className={styles.filterCategoryOptionsCategoryTitle}
						tabIndex={0}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
					>
						{category.name}
					</h4>
					<div className={styles.filterCategoryOptionsSubcategories}>
						{category.subcategories.map((subcategory) => (
							<div
								className={styles.filterCategoryOption}
								key={subcategory.value}
							>
								<input
									className={styles.filterCategoryOptionInput}
									type="radio"
									id={subcategory.value}
									name="category"
									value={subcategory.value}
									onChange={handleChange}
									checked={
										options.category === subcategory.value
									}
								/>
								<label
									className={styles.filterCategoryOptionLabel}
									htmlFor={subcategory.value}
									tabIndex={0}
									onKeyDown={handleKeyDown}
								>
									{subcategory.name}
								</label>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
