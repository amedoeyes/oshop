import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useAuth from "../hooks/useAuth";
import router from "../app/router";
import { isAxiosError } from "axios";
import { Link as RouterLink } from "react-router-dom";
import FormField from "../components/FormField";

export default function Register() {
	const { register } = useAuth();

	const initialValues = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const validationSchema: FormikConfig<typeof initialValues>["validationSchema"] = toFormikValidationSchema(
		z.object({
			email: z.string().email().min(1),
			name: z.string().min(1),
			password: z.string().min(6),
			password_confirmation: z
				.string()
				.min(6)
				.refine((val) => {
					return val === formik.values.password;
				}, "Password does not match"),
		})
	);

	const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (values, { setErrors }) => {
		try {
			await register(values);
			router.navigate("/login");
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response) {
					const errors = error.response.data.errors;

					if (errors) {
						setErrors(errors);
					}
				}
			}
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<Container
			maxWidth="sm"
			sx={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box p={5} boxShadow={5} borderRadius={5} width="100%">
				<Typography variant="h3" fontWeight="bold" align="center" gutterBottom marginBottom={5}>
					Register
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={2}>
						<FormField
							name="name"
							label="Name"
							type="text"
							autoFocus
							value={formik.values.name}
							helperText={formik.touched.name && formik.errors.name && formik.errors.name}
							error={formik.touched.name && formik.errors.name ? true : false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FormField
							name="email"
							label="Email"
							type="email"
							value={formik.values.email}
							helperText={formik.touched.email && formik.errors.email && formik.errors.email}
							error={formik.touched.email && formik.errors.email ? true : false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<Stack direction="row" spacing={2}>
							<FormField
								name="password"
								label="Password"
								type="password"
								value={formik.values.password}
								helperText={formik.touched.password && formik.errors.password && formik.errors.password}
								error={formik.touched.password && formik.errors.password ? true : false}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<FormField
								name="password_confirmation"
								label="Confirm Password"
								type="password"
								value={formik.values.password_confirmation}
								helperText={
									formik.touched.password_confirmation &&
									formik.errors.password_confirmation &&
									formik.errors.password_confirmation
								}
								error={
									formik.touched.password_confirmation && formik.errors.password_confirmation
										? true
										: false
								}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</Stack>
						<Button
							type="submit"
							disabled={formik.isSubmitting}
							variant="contained"
							size="large"
							sx={{
								borderRadius: "100rem",
							}}
						>
							<Typography>Register</Typography>
						</Button>
						<Stack direction="row" spacing={1}>
							<Typography>Already have an account?</Typography>
							<Link component={RouterLink} to="/login">
								Login
							</Link>
						</Stack>
					</Stack>
				</form>
			</Box>
		</Container>
	);
}
