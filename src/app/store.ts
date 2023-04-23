import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import filterOptionsReducer from "../features/filter/filterOptionsSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
	reducer: {
		products: productsReducer,
		product: productReducer,
		cart: cartReducer,
		filterOptions: filterOptionsReducer,
	},
});

export default store;
