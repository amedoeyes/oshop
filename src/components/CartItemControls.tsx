import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import {
	decrementQuantity,
	incrementQuantity,
	removeItem,
} from "../features/cart/cartSlice";
import styles from "./CartItemControls.module.scss";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";

type CartItemControlsProps = {
	cartItem: CartItem;
};

export default function CartItemControls({ cartItem }: CartItemControlsProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increment = (id: string) => () => dispatch(incrementQuantity(id));
	const decrement = (id: string) => () => dispatch(decrementQuantity(id));
	const remove = (id: string) => () => dispatch(removeItem(id));

	return (
		<div className={styles.cartItemControls}>
			<div className={styles.cartItemControlsSetQuantity}>
				<button
					className={styles.cartItemControlsSetQuantityButton}
					onClick={decrement(cartItem.product.id)}
					disabled={cartItem.quantity === 1}
				>
					<Remove />
				</button>
				<span className={styles.cartItemControlsSetQuantityNumber}>
					{cartItem.quantity}
				</span>
				<button
					className={styles.cartItemControlsSetQuantityButton}
					onClick={increment(cartItem.product.id)}
					disabled={cartItem.quantity === cartItem.product.stock}
				>
					<Add />
				</button>
			</div>
			<button
				className={styles.cartItemControlsDeleteButton}
				onClick={remove(cartItem.product.id)}
			>
				<DeleteOutline />
			</button>
		</div>
	);
}
