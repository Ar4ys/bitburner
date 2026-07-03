/// <reference types="node" />
import { type ChildProcess, spawn } from "node:child_process";
import path from "node:path";
import { watch } from "chokidar";

let proc: ChildProcess | null = null;

function start() {
	proc?.kill();
	proc = spawn("tsdown", ["--watch"], { stdio: "inherit" });
}

start();

const watcher = watch(path.join(import.meta.dirname, "..", "bin"), {
	ignoreInitial: true,
});

let t: NodeJS.Timeout;

function restart(reason: string) {
	clearTimeout(t);
	t = setTimeout(() => {
		console.log(reason);
		start();
	}, 300);
}

watcher
	.on("add", () => restart("new file added, restarting tsdown"))
	.on("unlink", () => restart("file removed, restarting tsdown"));
