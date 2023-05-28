import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../app/types";
import axiosClient from "../../app/axiosClient";

type initialState = {
	user: User | null;
	token: string | null;
	status: "idle" | "loading";
};

export const initializeUser = createAsyncThunk(
	"auth/initializeUser",
	async () => {
		const token = localStorage.getItem("token");

		if (token) {
			try {
				const res = await axiosClient.get("/auth/me");

				return res.data.data;
			} catch (error) {
				throw error;
			}
		}

		return null;
	}
);

const initialState: initialState = {
	user: null,
	token: window.localStorage.getItem("token") || null,
	status: "loading",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		_login: (state, action) => {
			state.user = action.payload.data.user;
			state.token = action.payload.data.token;
			window.localStorage.setItem("token", action.payload.data.token);
		},
		_logout: (state) => {
			state.user = null;
			state.token = null;
			window.localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initializeUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(initializeUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.status = "idle";
		});
	},
});

export const { _login, _logout } = authSlice.actions;
export default authSlice.reducer;
