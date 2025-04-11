import React, { useState } from "react";

const APropos: React.FC = () => {
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
				À propos
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
							À propos du projet 🚀
						</h2>
						<p className="text-sm sm:text-base text-gray-700 mb-4">
							Nous sommes un groupe d’apprenants à la Wild Code School, composé
							de
							<strong> Eric</strong>, <strong>Guillaume</strong> et{" "}
							<strong>David</strong>. Dans le cadre d'un exercice visant à
							consolider nos apprentissages, nous avons formé une petite équipe
							pour réaliser un projet ensemble.
						</p>
						<p className="text-sm sm:text-base text-gray-700 mb-4">
							Après quelques discussions, nous avons décidé de coder le{" "}
							<strong>Jeu de la Vie</strong>. Ce choix nous a permis de mettre
							en pratique nos compétences en développement, notamment avec{" "}
							<strong>React</strong> et <strong>Tailwind CSS</strong>, pour
							créer une interface interactive et responsive.
						</p>
						<p className="text-sm sm:text-base text-gray-700 mb-4">
							Ce projet a été l’occasion pour nous de travailler en
							collaboration, de résoudre des défis techniques, et d'explorer des
							concepts fondamentaux comme la gestion d'état en React et le
							design avec Tailwind CSS.
						</p>
						<p className="text-sm sm:text-base text-gray-700 mb-4">
							Grâce à l'aide de <strong>ChatGPT</strong>, nous n'avons pas eu
							besoin d'écrire ces lignes de présentation nous-mêmes, ce qui nous
							a permis de nous concentrer davantage sur le développement du
							projet.
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

export default APropos;
