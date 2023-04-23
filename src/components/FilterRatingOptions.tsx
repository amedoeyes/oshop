import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import styles from "./FilterRatingOptions.module.scss";
import ProductRating from "./ProductRating";
import { useSearchParams } from "react-router-dom";
import { setRating } from "../features/filter/filterOptionsSlice";

const ratingOptions = [5, 4, 3, 2, 1, 0];

export default function FilterRatingOptions() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const { options } = useSelector((state: RootState) => state.filterOptions);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);

		dispatch(setRating(value));
		searchParams.set("rating", value.toString());
		setSearchParams(searchParams);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.key === "Enter") e.currentTarget.click();
	};

	return (
		<div className={styles.ratingOptions}>
			<h3 className={styles.ratingOptionsTitle}>Rating</h3>
			{ratingOptions.map((rating) => (
				<div className={styles.ratingOption} key={rating}>
					<input
						className={styles.ratingOptionInput}
						type="radio"
						id={`${rating}`}
						name="rating"
						value={rating}
						onChange={handleChange}
						checked={options.rating === rating}
					/>
					<label
						className={styles.ratingOptionLabel}
						htmlFor={`${rating}`}
						tabIndex={0}
						onKeyDown={handleKeyDown}
					>
						<ProductRating rating={rating} />
					</label>
				</div>
			))}
		</div>
	);
}
