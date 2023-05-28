import { Delete } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import axiosRequests from "../app/axiosRequests";

type ProductDeleteButtonProps = {
	id: string | number;
	onDelete?: () => void;
};

export default function ProductDeleteButton({ id, onDelete }: ProductDeleteButtonProps) {
	const [open, setOpen] = useState(false);

	const handleDelete = async () => {
		await axiosRequests.deleteProduct(id);

		onDelete && onDelete();
		setOpen(false);
	};

	return (
		<>
			<IconButton onClick={() => setOpen(true)}>
				<Delete />
			</IconButton>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Delete Product</DialogTitle>

				<DialogContent>
					<DialogContentText>Are you sure you want to delete this product?</DialogContentText>

					<Stack direction="row" spacing={2} width="100%" justifyContent="center" mt={2}>
						<Button variant="outlined" size="large" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button variant="contained" size="large" onClick={handleDelete}>
							Delete
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}
