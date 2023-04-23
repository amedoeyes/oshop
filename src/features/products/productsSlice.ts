import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
	products: Product[];
	status: "loading" | "succeeded" | "failed";
	error: string | null;
};

type FetchProductsParams = {
	search?: string;
	category?: string;
	priceRange?: {
		max: number;
		min: number;
	};
	rating?: number;
};

export const fetchProducts = createAsyncThunk<
	Product[],
	FetchProductsParams | undefined
>("products/fetch", async (params) => {
	let baseUrl = "";
	let products: Product[] = [];

	if (params) {
		if (params.category) {
			const category = params.category;

			if (category === "all")
				baseUrl = "https://dummyjson.com/products?limit=100";
			else
				baseUrl = `https://dummyjson.com/products/category/${category}`;
		}

		const response = await axios.get(baseUrl);
		products = response.data.products;

		if (params.search) {
			const search = params.search;

			products = products.filter(
				(product) =>
					product.title.toLowerCase().includes(search) ||
					product.description.toLowerCase().includes(search)
			);
		}

		if (params.priceRange) {
			const { max, min } = params.priceRange;

			products = products.filter(
				(product) => product.price >= min && product.price <= max
			);
		}

		if (params.rating) {
			const rating = params.rating;

			products = products.filter((product) => product.rating >= rating);
		}
	} else {
		products = await axios
			.get(`${baseUrl}?limit=100`)
			.then((response) => response.data.products);
	}

	return products;
});

const initialState: InitialState = {
	products: [],
	status: "loading",
	error: null,
};

export const productsSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.products = action.payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message || null;
		});
	},
});

export default productsSlice.reducer;
