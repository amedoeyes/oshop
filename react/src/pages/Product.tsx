import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchProductById } from "../features/products/productSlice";
import ProductCarousel from "../components/ProductCarousel";
import ProductDetails from "../components/ProductDetails";
import AddToCart from "../components/AddToCart";
import ProductsSlider from "../components/ProductsSlider";
import NotFound from "./NotFound";

export default function Product() {
	const params = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const { product, status } = useSelector(
		(state: RootState) => state.product
	);

	if (status === "failed") return <NotFound />;

	useEffect(() => {
		if (params.id) dispatch(fetchProductById(params.id));
	}, []);

	return (
		<div className={styles.product}>
			{status === "loading" && (
				<div className={styles.productSkeleton}>
					<div></div>
					<div></div>
				</div>
			)}
			{status === "succeeded" && product && (
				<>
					<div className={styles.productWrapper}>
						<ProductCarousel />
						<div>
							<ProductDetails />
							<AddToCart />
						</div>
					</div>
					{product.category && (
						<ProductsSlider
							title="You might also like"
							category={product.category}
						/>
					)}
				</>
			)}
		</div>
	);
}
