import type { NS } from "@ns";

export const colors = {
	cyan: "\u001b[36m",
	green: "\u001b[32m",
	red: "\u001b[31m",
	reset: "\u001b[0m",
};

export function scanDepthFirst(
	ns: NS,
	fn: (host: string, depth: number) => void,
) {
	function recursive(host: string, parent?: string, depth: number = 0) {
		const hosts = ns.scan(host);

		for (const neighbour of hosts) {
			if (neighbour === parent) {
				continue;
			}

			fn(neighbour, depth);
			recursive(neighbour, host, depth + 1);
		}
	}

	recursive(ns.getHostname());
}
