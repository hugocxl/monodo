import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	entryPoints: {
		index: "src/index.ts",
		serve: "src/serve.ts",
		functions: "functions/index.ts",
	},
	format: ["cjs"],
	bundle: true,
	target: "node18",
	sourcemap: true,
});
