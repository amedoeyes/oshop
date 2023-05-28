import { TextField, TextFieldProps } from "@mui/material";

export default function FormField({ InputProps, ...props }: TextFieldProps) {
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
}
