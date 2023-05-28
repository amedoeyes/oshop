import axiosClient from "./axiosClient";
import { Category, Product } from "./types";

export type ProductStoreValues = {
	name: string;
	description: string;
	brand: string;
	category: string;
	price: string;
	discount: string;
	stock: string;
	thumbnail: File;
	images: File[];
};

export type ProductUpdateValues = {
	name?: string;
	description?: string;
	brand?: string;
	category?: string;
	price?: string;
	discount?: string;
	stock?: string;
	thumbnail?: File;
	images?: File[];
};

export type ProductsFilters = {
	search?: string;
	category?: string;
	min?: number;
	max?: number;
	rating?: number;
	vendor?: string;
};

const getCategories = async () => {
	try {
		const response = await axiosClient.get<Record<"data", Category[]>>("/categories");
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getProducts = async (filters?: ProductsFilters) => {
	try {
		const response = await axiosClient.get<Record<"data", Product[]>>("/products", { params: filters });
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const getUserProducts = async () => {
	try {
		const response = await axiosClient.get<Record<"data", Product[]>>(`/products/user`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const postProduct = async (product: ProductStoreValues) => {
	const data = new FormData();
	data.append("name", product.name);
	data.append("description", product.description);
	data.append("brand", product.brand);
	data.append("category", product.category);
	data.append("price", product.price);
	data.append("discount", product.discount);
	data.append("stock", product.stock);
	product.images.forEach((image) => {
		data.append("images[]", image);
	});
	data.append("thumbnail", product.thumbnail);

	try {
		const response = await axiosClient.post<Record<"data", Product>>("/products", data);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const updateProduct = async (id: string | number, product: ProductUpdateValues) => {
	const data = new FormData();
	data.append("_method", "PUT");
	if (product.name) data.append("name", product.name);
	if (product.description) data.append("description", product.description);
	if (product.brand) data.append("brand", product.brand);
	if (product.category) data.append("category", product.category);
	if (product.price) data.append("price", product.price);
	if (product.discount) data.append("discount", product.discount);
	if (product.stock) data.append("stock", product.stock);
	if (product.thumbnail) data.append("thumbnail", product.thumbnail);
	if (product.images)
		product.images.forEach((image) => {
			data.append("images[]", image);
		});

	try {
		const response = await axiosClient.post<Record<"data", Product>>(`/products/${id}`, data);
		return response.data.data;
	} catch (error) {
		throw error;
	}
};

const deleteProduct = (id: string | number) => axiosClient.delete(`/products/${id}`);

export default {
	getCategories,
	getProducts,
	postProduct,
	updateProduct,
	deleteProduct,
	getUserProducts,
};
