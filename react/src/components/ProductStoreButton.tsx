import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { Product } from "../app/types";
import axiosRequests, { ProductStoreValues } from "../app/axiosRequests";
import ProductStoreForm from "./ProductStoreForm";

type ProductEditButtonProps = {
	onStore?: (product: Product) => void;
};

export default function ProductStoreButton({ onStore }: ProductEditButtonProps) {
	const [open, setOpen] = useState(false);

	const handleSubmit = async (values: ProductStoreValues) => {
		const updateProduct = await axiosRequests.postProduct(values);

		onStore && onStore(updateProduct);
		setOpen(false);
	};

	return (
		<>
			<Button startIcon={<Add />} onClick={() => setOpen(true)}>
				New
			</Button>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>New Product</DialogTitle>

				<DialogContent>
					<ProductStoreForm onSubmit={handleSubmit} />
				</DialogContent>
			</Dialog>
		</>
	);
}
