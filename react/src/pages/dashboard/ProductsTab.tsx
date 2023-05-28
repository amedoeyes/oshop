import { Box, Rating, Skeleton, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Product } from "../../app/types";
import axiosRequests from "../../app/axiosRequests";
import ProductDeleteButton from "../../components/ProductDeleteButton";
import ProductUpdateButton from "../../components/ProductUpdateButton";
import ProductStoreButton from "../../components/ProductStoreButton";

export default function ProductsTab() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const handleStore = (product: Product) => {
		const updatedProducts = [...products];
		updatedProducts.unshift(product);
		setProducts(updatedProducts);
	};
	const handleEdit = (product: Product) => setProducts(products.map((p) => (p.id === product.id ? product : p)));
	const handleDelete = (id: string | number) => () => setProducts(products.filter((product) => product.id !== id));

	useEffect(() => {
		axiosRequests.getUserProducts().then((products) => {
			setProducts(products);
			setLoading(false);
		});
	}, []);

	const columns: GridColDef[] = [
		{
			field: "thumbnail",
			headerName: "Thumbnail",
			width: 100,
			align: "center",
			renderCell: (params) => (
				<img
					src={params.row.thumbnail}
					alt={params.row.name}
					height="100%"
					style={{ aspectRatio: "1/1", borderRadius: "20%", objectFit: "cover" }}
				/>
			),
		},
		{ field: "name", headerName: "Name", width: 200 },
		{ field: "description", headerName: "Description", width: 300 },
		{ field: "brand", headerName: "Brand", width: 100 },
		{ field: "category", headerName: "Category", width: 100 },
		{ field: "price", headerName: "Price", width: 100 },
		{ field: "stock", headerName: "Stock", width: 100 },
		{ field: "discount", headerName: "Discount", width: 100 },
		{
			field: "rating",
			headerName: "Rating",
			width: 150,
			renderCell: (params) => <Rating value={params.row.rating} precision={0.5} readOnly />,
		},
		{ field: "created_at", headerName: "Created At", width: 200 },
		{ field: "updated_at", headerName: "Updated At", width: 200 },
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			align: "center",
			getActions: (params) => [
				<ProductUpdateButton product={params.row} onUpdate={handleEdit} />,
				<ProductDeleteButton id={params.id} onDelete={handleDelete(params.id)} />,
			],
		},
	];

	return (
		<Box>
			<Stack direction="row" alignItems="center" spacing={1} mb={2}>
				<Typography variant="h4" ml={2}>
					Products
				</Typography>

				<ProductStoreButton onStore={handleStore} />
			</Stack>

			{loading ? (
				<Skeleton variant="rectangular" width="100%" height={600} sx={{ borderRadius: "1rem" }} />
			) : (
				<DataGrid
					rows={products}
					columns={columns}
					rowSelection={false}
					initialState={{
						pagination: { paginationModel: { pageSize: 25 } },
					}}
					pageSizeOptions={[25, 50, 100]}
					slots={{ toolbar: GridToolbar }}
					slotProps={{
						toolbar: {
							showQuickFilter: true,
							quickFilterProps: {
								variant: "outlined",
								size: "small",
								InputProps: { sx: { borderRadius: "100rem" } },
							},

							csvOptions: { disableToolbarButton: true },
							printOptions: { disableToolbarButton: true },
							sx: {
								p: 1,
							},
						},
					}}
					sx={{ borderRadius: "1rem" }}
				/>
			)}
		</Box>
	);
}
