import styles from "./CartItems.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { clearCart } from "../features/cart/cartSlice";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import ProductPrice from "./ProductPrice";
import CartItemControls from "./CartItemControls";

export default function CartItems() {
	const dispatch = useDispatch<AppDispatch>();
	const { cartItems, totalPrice, totalQuantity } = useSelector(
		(state: RootState) => state.cart
	);

	const cleanCart = () => dispatch(clearCart());

	return (
		<div className={styles.cartItems}>
			<div className={styles.cartItemsHeader}>
				<h2 className={styles.cartItemsTitle}>Cart</h2>
				<button className={styles.cartClearButton} onClick={cleanCart}>
					<RemoveShoppingCartOutlined />
				</button>
			</div>

			{cartItems.map((item) => (
				<div key={item.product.id} className={styles.cartItem}>
					<a
						href={`/product/${item.product.id}`}
						className={styles.cartItemWrapperLeft}
					>
						<img
							src={item.product.thumbnail}
							alt={item.product.title}
							className={styles.cartItemImage}
						/>
						<h3 className={styles.cartItemTitle}>
							{item.product.title}
						</h3>
					</a>
					<div className={styles.cartItemWrapperRight}>
						<ProductPrice product={item.product} preset="small" />
						<CartItemControls cartItem={item} />
					</div>
				</div>
			))}
		</div>
	);
}
