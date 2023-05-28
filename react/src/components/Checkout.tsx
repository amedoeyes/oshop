import CheckoutBox from "./CheckoutBox";
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import styles from "./Checkout.module.scss";
import { useState } from "react";

export default function Checkout() {
	const [showCheckoutBox, setShowCheckoutBox] = useState(false);

	const handleClick = () => setShowCheckoutBox(true);

	return (
		<div className={styles.checkout}>
			<button className={styles.checkoutButton} onClick={handleClick}>
				<ShoppingCartCheckoutOutlined />
				Checkout
			</button>
			{showCheckoutBox && <CheckoutBox />}
		</div>
	);
}
