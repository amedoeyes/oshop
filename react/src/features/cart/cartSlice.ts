import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
	cartItems: CartItem[];
	totalQuantity: number;
	totalPrice: number;
	error: string | null;
};

const initialState: InitialState = {
	cartItems: [],
	totalQuantity: 0,
	totalPrice: 0,
	error: null,
};

const localStorageCart: InitialState | null = JSON.parse(
	localStorage.getItem("cart") || "null"
);

const cartSlice = createSlice({
	name: "cart",
	initialState: localStorageCart || initialState,
	reducers: {
		addItem(state, action) {
			const { product, quantity } = action.payload;

			const existingItem = state.cartItems.find(
				(item) => item.product.id === product.id
			);

			if (existingItem) {
				const totalQuantity = quantity + (existingItem.quantity || 0);
				state.error = null;

				if (totalQuantity > product.stock) {
					state.error =
						"You are attempting to add more items than are available";
					return;
				}

				existingItem.quantity += quantity;
			} else {
				state.cartItems.push({
					product,
					quantity,
				});
			}

			state.totalQuantity += quantity;
			state.totalPrice = state.cartItems.reduce(
				(sum, item) => sum + Number(item.product.price) * item.quantity,
				0
			);

			localStorage.setItem("cart", JSON.stringify(state));
		},
		removeItem(state, action) {
			const id = action.payload;
			const item = state.cartItems.find((item) => item.product.id === id);

			state.cartItems = state.cartItems.filter(
				(item) => item.product.id !== id
			);

			state.totalQuantity -= item?.quantity || 0;
			state.totalPrice = state.cartItems.reduce(
				(sum, item) => sum + Number(item.product.price) * item.quantity,
				0
			);

			localStorage.setItem("cart", JSON.stringify(state));
		},
		incrementQuantity(state, action) {
			const id = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.product.id === id
			);

			if (existingItem) {
				const totalQuantity = existingItem.quantity || 0;
				state.error = null;

				if (totalQuantity === existingItem.product.stock) {
					state.error =
						"You are attempting to add more items than are available";
					return;
				}

				existingItem.quantity++;
			}

			state.totalQuantity++;
			state.totalPrice = state.cartItems.reduce(
				(sum, item) => sum + Number(item.product.price) * item.quantity,
				0
			);

			localStorage.setItem("cart", JSON.stringify(state));
		},
		decrementQuantity(state, action) {
			const id = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item.product.id === id
			);

			if (existingItem) {
				const totalQuantity = existingItem.quantity || 0;
				state.error = null;

				if (totalQuantity === 1) {
					state.error =
						"You are attempting to remove less items than are available";
					return;
				}

				existingItem.quantity--;
			}

			state.totalQuantity--;
			state.totalPrice = state.cartItems.reduce(
				(sum, item) => sum + Number(item.product.price) * item.quantity,
				0
			);

			localStorage.setItem("cart", JSON.stringify(state));
		},

		clearCart(state) {
			state.cartItems = [];
			state.totalQuantity = 0;
			state.totalPrice = 0;

			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const {
	addItem,
	removeItem,
	incrementQuantity,
	decrementQuantity,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
