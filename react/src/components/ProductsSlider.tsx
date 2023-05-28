import styles from "./ProductsSlider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";
import axios from "axios";

type ProductsSliderProps = {
	title?: string;
	category: string;
};

type state = {
	products: Product[];
	status: "loading" | "succeeded" | "failed";
};

export default function ProductsSlider({
	title,
	category,
}: ProductsSliderProps) {
	const [state, setState] = useState<state>({
		products: [],
		status: "loading",
	});

	useEffect(() => {
		axios
			.get(`https://dummyjson.com/products/category/${category}`)
			.then((res) =>
				setState({ products: res.data.products, status: "succeeded" })
			)
			.catch((err) => setState({ products: [], status: "failed" }));
	}, []);

	return (
		<div className={styles.productsSlider}>
			{title && <h2>{title}</h2>}
			<div className={styles.productsSliderCards}>
				{(state.status === "loading" || state.status === "failed") &&
					Array(5)
						.fill(0)
						.map((_, i) => (
							<ProductCard key={i} status="loading" />
						))}
				{state.status === "succeeded" &&
					state.products
						.slice(0, 9)
						.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								status="succeeded"
							/>
						))}
			</div>
		</div>
	);
}
