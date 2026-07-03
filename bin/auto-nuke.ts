import type { NS } from "@ns";
import { colors, scanDepthFirst } from "@/utils";

export async function main(ns: NS): Promise<void> {
	switch (ns.args[0]) {
		case "ls":
			ls(ns);
			break;

		default:
			autoNuke(ns);
			break;
	}
}

function ls(ns: NS) {
	ns.tprint(`List of nuked hosts:`);
	scanDepthFirst(ns, (host, depth) => {
		const ident = "".padStart(depth * 2);

		if (ns.hasRootAccess(host)) {
			ns.tprint(`${ident}${colors.cyan}${host}${colors.reset}`);
		}
	});
}

function autoNuke(ns: NS) {
	scanDepthFirst(ns, (host, depth) => {
		const ident = "".padStart(depth * 2);

		if (ns.hasRootAccess(host)) {
			ns.tprint(
				`${ident}${colors.cyan}Host: ${host} already has root access!${colors.reset}`,
			);
		} else if (ns.nuke(host)) {
			ns.tprint(
				`${ident}${colors.green}Host: ${host} gained root access!${colors.reset}`,
			);
		} else {
			ns.tprint(
				`${ident}${colors.red}Host: ${host} unable to gain root access!${colors.reset}`,
			);
		}
	});
}
