import {
	Autocomplete,
	Box,
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	TextFieldProps,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import axiosRequests from "../../../app/axiosRequests";
import { useNavigate } from "react-router-dom";

const Field = ({ InputProps, ...props }: TextFieldProps) => {
	return (
		<TextField
			id={props.name}
			required
			variant="outlined"
			fullWidth
			InputProps={{
				...InputProps,
				sx: {
					borderRadius: "2rem",
				},
			}}
			{...props}
		/>
	);
};

export default function NewProduct() {
	const navigate = useNavigate();

	const initialValues = {
		name: "",
		description: "",
		brand: "",
		category: "",
		price: "0",
		stock: "0",
		discount: "0",
		thumbnail: new File([], ""),
		images: [],
	};

	const validationSchema = toFormikValidationSchema(
		z.object({
			name: z.string().min(1),
			description: z.string().min(1),
			brand: z.string().min(1),
			category: z.string().min(1),
			price: z.string().refine((value) => Number(value) > 0, "Price must be greater than 0"),
			discount: z
				.string()
				.refine((value) => Number(value) >= 0 && Number(value) <= 100, "Discount must be between 0 and 100"),
			stock: z.string().refine((value) => Number(value) > 0, "Stock must be greater than 0"),
			thumbnail: z
				.instanceof(File)
				.refine((file) => file.size > 0, "Required")
				.refine((file) => file.type === "image/jpeg" || file.type === "image/png", "Must be an image"),
			images: z
				.array(z.instanceof(File))
				.min(1, "Required")
				.refine(
					(files) => files.every((file) => file.type === "image/jpeg" || file.type === "image/png"),
					"Must be images"
				),
		})
	);

	const handleSubmit = async (values: typeof initialValues) => {
		await axiosRequests.postProduct(values);
		navigate("/dashboard/products");
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		axiosRequests.getCategories().then((categories) => {
			const categoryNames = categories.map((category) => category.name);
			setCategories(categoryNames);
		});
	}, []);

	return (
		<Box>
			<Typography variant="h4" ml={2} mb={2}>
				New Product
			</Typography>
			<Container maxWidth="sm">
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={2}>
						<Field
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>

						<Field
							name="description"
							label="Description"
							multiline
							minRows={4}
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.description && Boolean(formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
						/>

						<Stack direction="row" spacing={2}>
							<Field
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
								onChange={(_, newValue) => formik.setFieldValue("category", newValue || "")}
								renderInput={(params) => (
									<Field
										{...params}
										name="category"
										label="Category"
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
							<Field
								name="price"
								label="Price"
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
								}}
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.price && Boolean(formik.errors.price)}
								helperText={formik.touched.price && formik.errors.price}
							/>
							<Field
								name="discount"
								label="Discount"
								InputProps={{
									startAdornment: <InputAdornment position="start">%</InputAdornment>,
								}}
								value={formik.values.discount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.discount && Boolean(formik.errors.discount)}
								helperText={formik.touched.discount && formik.errors.discount}
							/>
							<Field
								name="stock"
								label="Stock"
								value={formik.values.stock}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.stock && Boolean(formik.errors.stock)}
								helperText={formik.touched.stock && formik.errors.stock}
							/>
						</Stack>

						<Stack direction="row" spacing={2}>
							<Field
								name="thumbnail"
								label="Thumbnail"
								type="file"
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
							<Field
								name="images"
								label="Images"
								type="file"
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
								helperText={formik.touched.images && formik.errors.images}
							/>
						</Stack>

						<Button type="submit" disabled={formik.isSubmitting} variant="contained" fullWidth size="large">
							<Typography>Create</Typography>
						</Button>
					</Stack>
				</form>
			</Container>
		</Box>
	);
}
