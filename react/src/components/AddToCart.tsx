import { useDispatch, useSelector } from "react-redux";
import styles from "./AddToCart.module.scss";
import { AppDispatch, RootState } from "../app/store";
import { useState } from "react";
import { addItem } from "../features/cart/cartSlice";
import { Add, Remove } from "@mui/icons-material";

export default function AddToCart() {
	const dispatch = useDispatch<AppDispatch>();
	const { product } = useSelector((state: RootState) => state.product);
	const { error } = useSelector((state: RootState) => state.cart);
	if (!product) return <></>;
	const [quantity, setQuantity] = useState(1);

	const increment = () => setQuantity((prev) => prev + 1);
	const decrement = () => setQuantity((prev) => prev - 1);

	const addToCart = () => {
		dispatch(addItem({ product, quantity }));
	};

	return (
		<div className={styles.addToCart}>
			<div className={styles.addToCartControls}>
				<button
					className={styles.addToCartSetQuantityButton}
					onClick={decrement}
					disabled={quantity <= 1}
				>
					<Remove />
				</button>
				<span className={styles.addToCartSetQuantityNumber}>
					{quantity}
				</span>
				<button
					className={styles.addToCartSetQuantityButton}
					onClick={increment}
					disabled={quantity >= product.stock}
				>
					<Add />
				</button>
				<button className={styles.addToCartButton} onClick={addToCart}>
					Add to cart
				</button>
			</div>
			{error && <p className={styles.addToCartError}>{error}</p>}
		</div>
	);
}
