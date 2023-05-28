import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "./CartSummery.module.scss";
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import Checkout from "./Checkout";

export default function CartSummery() {
	const { totalPrice, totalQuantity } = useSelector(
		(state: RootState) => state.cart
	);

	return (
		<div className={styles.cartSummery}>
			<h2 className={styles.cartSummeryTitle}>Summery</h2>
			<div className={styles.cartSummeryTotal}>
				<p>
					Total Price:
					<span> ${totalPrice.toLocaleString()}</span>
				</p>
				<p>
					Total Quantity:
					<span> {totalQuantity}</span>
				</p>
			</div>
			<Checkout />
		</div>
	);
}
