import styles from "./ProductCard.module.scss";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import fallback from "../assets/fallback.png";

type ProductCardProps = {
	product?: Product;
	status: "loading" | "succeeded" | "failed";
};

export default function ProductCard({ product, status }: ProductCardProps) {
	return (
		<div className={styles.productCard}>
			{(status === "loading" || status === "failed") && (
				<div className={styles.productCardSkeleton}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
			{status === "succeeded" && product && (
				<a
					href={`/product/${product.id}`}
					className={styles.productCardContent}
				>
					<div className={styles.productCardContentTop}>
						<img
							className={styles.productCardImage}
							src={product.thumbnail}
							alt={product.title}
							loading="lazy"
							onError={(e) => (e.currentTarget.src = fallback)}
						/>
						<h3 className={styles.productCardTitle}>
							{product.title}
						</h3>
					</div>
					<div className={styles.productCardWrapper}>
						<ProductPrice product={product} preset="small" />
						<ProductRating rating={product.rating} />
					</div>
				</a>
			)}
		</div>
	);
}
