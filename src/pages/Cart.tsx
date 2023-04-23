import CartSummery from "./../components/CartSummery";
import { useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { RootState } from "../app/store";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import CartItems from "../components/CartItems";

export default function Cart() {
	const { cartItems } = useSelector((state: RootState) => state.cart);

	return (
		<>
			{cartItems.length === 0 && (
				<div className={styles.emptyCart}>
					<h1 className={styles.emptyCartTitle}>Cart is empty</h1>
					<RemoveShoppingCartOutlined />
				</div>
			)}
			{cartItems.length > 0 && (
				<div className={styles.cart}>
					<CartItems />
					<CartSummery />
				</div>
			)}
		</>
	);
}
