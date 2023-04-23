import { useSearchParams } from "react-router-dom";
import styles from "./FilterPriceRange.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setPriceRange } from "../features/filter/filterOptionsSlice";
import { useState } from "react";

export default function FilterPriceRange() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const { options } = useSelector((state: RootState) => state.filterOptions);

	const [localPriceRange, setLocalPriceRange] = useState({
		min: options.priceRange.min.toString(),
		max: options.priceRange.max.toString(),
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setLocalPriceRange({
			...localPriceRange,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const min = Number(localPriceRange.min);
		const max = Number(localPriceRange.max);

		if (min > max) return;

		dispatch(setPriceRange({ min, max }));
		searchParams.set("priceRange", JSON.stringify({ min, max }));
		setSearchParams(searchParams);
	};

	return (
		<form className={styles.filterPriceRange} onSubmit={handleSubmit}>
			<h3 className={styles.filterPriceRangeTitle}>Price Range</h3>
			<div className={styles.filterPriceRangeInputWrapper}>
				<label htmlFor="min">Min</label>
				<input
					className={styles.filterPriceRangeInput}
					type="text"
					name="min"
					pattern="[0-9]*"
					inputMode="numeric"
					value={localPriceRange.min}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.filterPriceRangeInputWrapper}>
				<label htmlFor="max">Max</label>
				<input
					className={styles.filterPriceRangeInput}
					type="text"
					name="max"
					pattern="[0-9]*"
					inputMode="numeric"
					value={localPriceRange.max}
					onChange={handleChange}
				/>
			</div>
			<button className={styles.filterPriceRangeButton} type="submit">
				Apply
			</button>
		</form>
	);
}
