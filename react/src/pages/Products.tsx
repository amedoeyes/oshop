import ProductsList from "./../components/ProductsList";
import styles from "./Products.module.scss";
import ProductsFilter from "../components/ProductsFilter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsSlice";

export default function Products() {
	const dispatch = useDispatch<AppDispatch>();
	const { options } = useSelector((state: RootState) => state.filterOptions);

	useEffect(() => {
		dispatch(fetchProducts(options));
	}, [options]);

	return (
		<div className={styles.products}>
			<ProductsFilter />
			<ProductsList />
		</div>
	);
}
