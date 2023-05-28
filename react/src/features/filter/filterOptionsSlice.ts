import { createSlice } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";

type InitialState = {
	options: {
		search: string;
		category: string;
		priceRange: {
			max: number;
			min: number;
		};
		rating: number;
	};
};

const url = new URL(window.location.href).searchParams;
const { category, priceRange, rating, search } = Object.fromEntries(
	url.entries()
);

const initialState: InitialState = {
	options: {
		category: category || "all",
		rating: Number(rating) || 0,
		priceRange: JSON.parse(priceRange || "null") || { min: 0, max: 20000 },
		search: search || "",
	},
};

const filterOptionsSlice = createSlice({
	name: "filterOptions",
	initialState,
	reducers: {
		setOptions: (state, action) => {
			state.options = action.payload;
		},
		setSearch: (state, action) => {
			state.options.search = action.payload;
		},
		setCategory: (state, action) => {
			state.options.category = action.payload;
		},
		setPriceRange: (state, action) => {
			state.options.priceRange = action.payload;
		},
		setRating: (state, action) => {
			state.options.rating = action.payload;
		},
	},
});

export const { setOptions, setSearch, setCategory, setPriceRange, setRating } =
	filterOptionsSlice.actions;

export default filterOptionsSlice.reducer;
