export type Product = {
	id: string;
	name: string;
	description: string;
	brand: string;
	price: number;
	discount: number;
	rating: number;
	stock: number;
	category: string;
	thumbnail: string;
	images: string[];
	created_at: string;
	updated_at: string;
};

export type CartItem = {
	product: Product;
	quantity: number;
};

export type Cart = {
	items: CartItem[];
	totalPrice: number;
	totalQuantity: number;
};

export type User = {
	id: string;
	name: string;
	email: string;
	role: "user" | "vendor" | "admin";
	cart: Cart;
	products: Product[];
	created_at: string;
	updated_at: string;
};

export type Category = {
	id: string;
	name: string;
	parentCategories: Category;
	subcategories: Category[];
	created_at: string;
	updated_at: string;
};
