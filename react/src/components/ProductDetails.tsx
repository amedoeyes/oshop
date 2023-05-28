import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "./ProductDetails.module.scss";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

const categories: Record<string, string> = {
	smartphones: "Smartphones",
	laptops: "Laptops",
	fragrances: "Fragrances",
	skincare: "Skincare",
	groceries: "Groceries",
	"home-decoration": "Home Decoration",
	furniture: "Furniture",
	tops: "Tops",
	"womens-dresses": "Womens Dresses",
	"womens-shoes": "Womens Shoes",
	"mens-shirts": "Mens Shirts",
	"mens-shoes": "Mens Shoes",
	"mens-watches": "Mens Watches",
	"womens-watches": "Womens Watches",
	"womens-bags": "Womens Bags",
	"womens-jewellery": "Womens Jewellery",
	sunglasses: "Sunglasses",
	automotive: "Automotive",
	motorcycle: "Motorcycle",
	lighting: "Lighting",
};

export default function ProductDetails() {
	const { product } = useSelector((state: RootState) => state.product);
	if (!product) return <></>;
	const { category, title, brand, description, rating, stock } = product;

	return (
		<div className={styles.productDetails}>
			<a
				href={`/products?category=${category}`}
				className={styles.productCategory}
			>
				{categories[category]}
			</a>
			<h1 className={styles.productTitle}>{title}</h1>
			<p className={styles.productBrand}>{brand}</p>
			<ProductRating rating={rating} />
			<p className={styles.productDescription}>{description}</p>
			<ProductPrice product={product} preset="large" />
			<p className={styles.productStock}>{stock} left</p>
		</div>
	);
}
