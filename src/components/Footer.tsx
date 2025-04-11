import React from "react";

import Regles from "./Regles";
import APropos from "./APropos";

function Footer() {
	return (
		<footer className="flex justify-around items-center p-4 bg-amber-600 text-amber-100">
			<Regles />
			<div className="text-center text-amber-100 text-xl">
				&copy; {new Date().getFullYear()}{" "}
				<span className="font-semibold text-amber-400">Wilders</span>. Tous
				droits réservés.
			</div>
			<APropos />
		</footer>
	);
}

export default Footer;
