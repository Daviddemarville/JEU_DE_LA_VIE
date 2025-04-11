import React, { useState } from "react";

const Regles: React.FC = () => {
	const [show, setShow] = useState(false);
	const [visible, setVisible] = useState(false); // Pour gérer l'animation

	// Fonction pour ouvrir la modale avec animation
	const openModal = () => {
		setShow(true);
		setTimeout(() => setVisible(true), 10); // Laisser React afficher avant animation
	};

	// Fonction pour fermer la modale avec animation
	const closeModal = () => {
		setVisible(false); // Lancer l'animation de sortie
		setTimeout(() => setShow(false), 300); // Attendre la fin de l'animation avant de retirer du DOM
	};

	return (
		<>
			{/* Bouton pour afficher la modale */}
			<button
				onClick={openModal}
				className="px-4 py-2 bg-amber-100 text-black rounded"
			>
				Voir les règles
			</button>

			{/* Modale affichée uniquement si show est true */}
			{show && (
				<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
					<div
						className={`
              bg-white p-6 rounded-xl shadow-2xl max-w-md w-11/12 transform transition-all duration-300
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
					>
						<h2 className="text-xl font-bold mb-4 text-center text-amber-600">
							Règles du Jeu de la Vie 🧬
						</h2>
						<ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
							<li>Une cellule vivante avec 2 ou 3 voisines vivantes survit.</li>
							<li>
								Une cellule morte avec exactement 3 voisines vivantes devient
								vivante.
							</li>
							<li>
								Dans tous les autres cas, une cellule meurt ou reste morte.
							</li>
						</ul>
						<p className="mt-4 text-xs text-gray-500 text-center">
							Ces règles sont appliquées à chaque génération à toutes les
							cellules en même temps.
						</p>

						{/* Bouton pour masque la modale */}
						<div className="flex justify-center mt-6">
							<button
								onClick={closeModal}
								className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-red-600 transition"
							>
								Fermer
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Regles;
