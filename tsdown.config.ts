import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["bin/*.ts"],
	sourcemap: false,
	clean: true,
	format: "esm",
	dts: false,
	target: false,
});
