import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["bin/*.ts"],
	sourcemap: false,
	clean: true,
	dts: false,
	target: false,
	platform: "browser",
});
