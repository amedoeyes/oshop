import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
	product: Product | null;
	status: "loading" | "succeeded" | "failed";
	error: string | null;
};

export const fetchProductById = createAsyncThunk<Product, string>(
	"products/fetchProductById",
	async (id: string) => {
		const response = await axios.get(
			`https://dummyjson.com/products/${id}`
		);

		return response.data;
	}
);

const initialState: InitialState = {
	product: null,
	status: "loading",
	error: null,
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.product = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || null;
			});
	},
});

export default productSlice.reducer;
