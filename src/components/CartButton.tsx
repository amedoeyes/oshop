import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "./CartButton.module.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function CartButton() {
	const { totalQuantity } = useSelector((state: RootState) => state.cart);

	const quantityDisplay = totalQuantity > 99 ? "+99" : totalQuantity;

	return (
		<a href="/cart" className={styles.cartButton}>
			{totalQuantity > 0 && (
				<span className={styles.cartButtonQuantity}>
					{quantityDisplay}
				</span>
			)}
			<ShoppingCartOutlinedIcon />
		</a>
	);
}
