import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { FormikConfig, useFormik } from "formik";
import { isAxiosError } from "axios";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import FormField from "../components/FormField";

type ErrorResponse = {
	message: string;
	errors?: Record<string, string[]>;
};

export default function Login() {
	const { login } = useAuth();

	const initialValues = {
		email: "",
		password: "",
	};
	const [isInvalid, setIsInvalid] = useState(false);

	const validationSchema = toFormikValidationSchema(
		z.object({
			email: z.string().email().min(1),
			password: z.string().min(1),
		})
	);

	const handleSubmit: FormikConfig<typeof initialValues>["onSubmit"] = async (values) => {
		setIsInvalid(false);

		try {
			await login(values);
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response) {
					if (error.response.status === 401) {
						setIsInvalid(true);
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
					Login
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={2}>
						<FormField
							label="Email"
							name="email"
							type="email"
							autoFocus
							value={formik.values.email}
							helperText={formik.touched.email && formik.errors.email && formik.errors.email}
							error={formik.touched.email && formik.errors.email ? true : false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
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
						{isInvalid && (
							<Typography variant="body1" color="error" align="center">
								Invalid credentials
							</Typography>
						)}
						<Button type="submit" disabled={formik.isSubmitting} variant="contained" size="large">
							<Typography>Login</Typography>
						</Button>
						<Stack direction="row" spacing={1}>
							<Typography>Don't have an account?</Typography>
							<Link component={RouterLink} to="/register">
								Register
							</Link>
						</Stack>
					</Stack>
				</form>
			</Box>
		</Container>
	);
}
