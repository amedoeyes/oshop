import small from "./ProductPriceSmall.module.scss";
import large from "./ProductPriceLarge.module.scss";
import largeInverted from "./ProductPriceLargeInverted.module.scss";

const presets = { small, large, largeInverted };

type ProductPriceProps = {
	preset: "small" | "large" | "largeInverted";
	product: Product;
};
export default function ProductPrice({ product, preset }: ProductPriceProps) {
	const { price, discountPercentage } = product;
	const oldPrice = (
		Number(price) *
		(1 + Number(discountPercentage) / 100)
	).toFixed(2);

	const styles = presets[preset];

	return (
		<div className={styles.productPriceInfo}>
			<p className={styles.productPrice}>
				<span className={styles.productNewPrice}>${price}</span>
				{discountPercentage && (
					<span className={styles.productOldPrice}>${oldPrice}</span>
				)}
			</p>
			{discountPercentage && (
				<p className={styles.productDiscount}>-{discountPercentage}%</p>
			)}
		</div>
	);
}
