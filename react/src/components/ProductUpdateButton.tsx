import { Edit } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { Product } from "../app/types";
import ProductUpdateForm from "./ProductUpdateForm";
import axiosRequests, { ProductUpdateValues } from "../app/axiosRequests";

type ProductEditButtonProps = {
	product: Product;
	onUpdate?: (product: Product) => void;
};

export default function ProductUpdateButton({ product, onUpdate }: ProductEditButtonProps) {
	const [open, setOpen] = useState(false);

	const initialValues = {
		name: product.name,
		description: product.description,
		brand: product.brand,
		category: product.category,
		price: product.price.toString(),
		stock: product.stock.toString(),
		discount: product.discount.toString(),
	};

	const handleSubmit = async (values: ProductUpdateValues) => {
		const updateProduct = await axiosRequests.updateProduct(product.id, values);

		onUpdate && onUpdate(updateProduct);
		setOpen(false);
	};

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<Edit />
			</IconButton>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Edit Product</DialogTitle>

				<DialogContent>
					<ProductUpdateForm initialValues={initialValues} onSubmit={handleSubmit} />
				</DialogContent>
			</Dialog>
		</>
	);
}
