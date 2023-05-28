import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductsList.module.scss";
import { AppDispatch, RootState } from "../app/store";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";

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

export default function ProductsList() {
	const dispatch = useDispatch<AppDispatch>();
	const [searchParams] = useSearchParams();
	const category = searchParams.get("category");

	const { products, status } = useSelector(
		(state: RootState) => state.products
	);

	return (
		<div className={styles.productsList}>
			<h2>{categories[category!] || "All"}</h2>
			<div className={styles.productsListCards}>
				{(status === "loading" || status === "failed") &&
					Array(20)
						.fill(0)
						.map((_, index) => (
							<ProductCard key={index} status="loading" />
						))}
				{status === "succeeded" &&
					products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							status={status}
						/>
					))}
			</div>
		</div>
	);
}
