import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: {
			key: "./certs/key.pem",
			cert: "./certs/cert.pem",
		},
	},
	plugins: [react()],
});
