import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import axiosRequests, { ProductUpdateValues } from "../app/axiosRequests";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Autocomplete, Button, InputAdornment, Stack, Typography } from "@mui/material";
import FormField from "./FormField";

type ProductFormProps = {
	initialValues: ProductUpdateValues;
	onSubmit: (values: ProductUpdateValues) => void;
};

export default function ProductUpdateForm({ initialValues, onSubmit }: ProductFormProps) {
	const validationSchema = toFormikValidationSchema(
		z.object({
			name: z.optional(z.string()),
			description: z.optional(z.string()),
			brand: z.optional(z.string()),
			category: z.optional(z.string()),
			price: z.optional(z.string().refine((value) => Number(value) > 0, "Price must be greater than 0")),
			discount: z.optional(
				z
					.string()
					.refine((value) => Number(value) >= 0 && Number(value) <= 100, "Discount must be between 0 and 100")
			),
			stock: z.optional(z.string().refine((value) => Number(value) > 0, "Stock must be greater than 0")),
			thumbnail: z.optional(
				z
					.instanceof(File)
					.refine((file) => file.type === "image/jpeg" || file.type === "image/png", "Must be an image")
			),
			images: z.optional(
				z
					.array(z.instanceof(File))
					.refine(
						(files) => files.every((file) => file.type === "image/jpeg" || file.type === "image/png"),
						"Must be images"
					)
			),
		})
	);

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		axiosRequests.getCategories().then((categories) => {
			const categoryNames = categories.map((category) => category.name);
			setCategories(categoryNames);
		});
	}, []);

	return (
		<form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
			<Stack spacing={2}>
				<FormField
					name="name"
					label="Name"
					required={false}
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>

				<FormField
					name="description"
					label="Description"
					required={false}
					multiline
					minRows={4}
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
				/>

				<Stack direction="row" spacing={2}>
					<FormField
						name="brand"
						label="Brand"
						value={formik.values.brand}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.brand && Boolean(formik.errors.brand)}
						helperText={formik.touched.brand && formik.errors.brand}
					/>
					<Autocomplete
						options={categories}
						getOptionLabel={(option) => option}
						sx={{
							width: "100%",
						}}
						value={formik.values.category || null}
						onChange={(_, newValue) => formik.setFieldValue("category", newValue || "")}
						renderInput={(params) => (
							<FormField
								{...params}
								name="category"
								label="Category"
								required={false}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "100rem",
									},
								}}
								onBlur={formik.handleBlur}
								error={formik.touched.category && Boolean(formik.errors.category)}
								helperText={formik.touched.category && formik.errors.category}
							/>
						)}
					/>
				</Stack>

				<Stack direction="row" spacing={2}>
					<FormField
						name="price"
						label="Price"
						required={false}
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
						}}
						value={formik.values.price}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.price && Boolean(formik.errors.price)}
						helperText={formik.touched.price && formik.errors.price}
					/>
					<FormField
						name="discount"
						label="Discount"
						required={false}
						InputProps={{
							startAdornment: <InputAdornment position="start">%</InputAdornment>,
						}}
						value={formik.values.discount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.discount && Boolean(formik.errors.discount)}
						helperText={formik.touched.discount && formik.errors.discount}
					/>
					<FormField
						name="stock"
						label="Stock"
						required={false}
						value={formik.values.stock}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.stock && Boolean(formik.errors.stock)}
						helperText={formik.touched.stock && formik.errors.stock}
					/>
				</Stack>

				<Stack direction="row" spacing={2}>
					<FormField
						name="thumbnail"
						label="Thumbnail"
						type="file"
						required={false}
						inputProps={{
							accept: "image/jpeg, image/png",
							sx: {
								"::file-selector-button": {
									display: "none",
								},
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							formik.setFieldValue("thumbnail", e.target.files![0])
						}
						onBlur={formik.handleBlur}
						error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
						helperText={formik.touched.thumbnail && (formik.errors.thumbnail as string)}
					/>
					<FormField
						name="images"
						label="Images"
						type="file"
						required={false}
						inputProps={{
							multiple: true,
							accept: "image/jpeg, image/png",
							sx: {
								"::file-selector-button": {
									display: "none",
								},
							},
						}}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const files = Array.from(e.target.files!);
							return formik.setFieldValue("images", files);
						}}
						onBlur={formik.handleBlur}
						error={formik.touched.images && Boolean(formik.errors.images)}
						helperText={formik.touched.images && (formik.errors.images as string)}
					/>
				</Stack>

				<Button type="submit" disabled={formik.isSubmitting} variant="contained" fullWidth size="large">
					<Typography>Submit</Typography>
				</Button>
			</Stack>
		</form>
	);
}
