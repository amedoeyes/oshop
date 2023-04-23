import { CheckCircle } from "@mui/icons-material";
import styles from "./CheckoutBox.module.scss";
import requireAuth from "./requireAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

function CheckoutBox() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/");
			setTimeout(() => {
				dispatch(clearCart());
			}, 100);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<div className={styles.checkoutBoxBackdrop}></div>
			<div className={styles.checkoutBox}>
				<h1 className={styles.checkoutTitle}>Thank you!</h1>
				<p className={styles.checkoutText}>
					Your order has been received.
				</p>
				<CheckCircle />
			</div>
		</div>
	);
}

export default requireAuth(CheckoutBox);
