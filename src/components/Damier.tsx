import Cell from "../components/Cell";
import { useState, useEffect, useRef } from "react";

function Damier() {
	const [size, setSize] = useState(6);
	const [cellsState, setCellsState] = useState(() => createEmptyDamier(size));
	const [isPlaying, setIsPlaying] = useState(false);
	const [turnNumber, setTurnNumber] = useState(0);
	const [generationSpeed, setGenerationSpeed] = useState(100);

	//const sectionStyle = {};

	// Initialisation au chargement de la page - Crée un tableau à deux dimensions de tous les états de celulle et les initialise à faux
	function createEmptyDamier(size: number) {
		const initialGrid = [];
		for (let x = 0; x < size; x++) {
			const row = [];
			for (let y = 0; y < size; y++) {
				row.push(false);
			}
			initialGrid.push(row);
		}
		return initialGrid;
	}

	// Fonction utilitaires de randomisation
	function GetRandomBoolean() {
		return Math.random() > 0.5;
	}

	// Fonction randomisation du tableau et de son contenu
	function RandomizeGrid() {
		setTurnNumber(0);

		const next = [];
		for (let x = 0; x < cellsState.length; x++) {
			const row = [];
			for (let y = 0; y < cellsState[x].length; y++) {
				row.push(GetRandomBoolean());
			}
			next.push(row);
		}

		setCellsState(next);
	}

	// Update le tableau d'état en taille, si cette dernière a changé
	useEffect(() => {
		setCellsState(createEmptyDamier(size));
	}, [size]);

	// Update l'état d'une cellule x, y : ne sert qu'à transmettre l'info au composant pour gérer le clic souris initial
	const toggleCell = (x, y, newState) => {
		const updated = [];

		// Va chercher l'état de cellule i, j qui correspond au x, y demandé en paramètre
		for (let i = 0; i < cellsState.length; i++) {
			const row = [];

			for (let j = 0; j < cellsState[i].length; j++) {
				if (i === x && j === y) {
					row.push(newState); // on change l'état de la cellule ciblée
				} else {
					row.push(cellsState[i][j]); // on garde les autres inchangées
				}
			}

			updated.push(row);
		}

		setCellsState(updated);
	};

	// FONCTION MISE A JOUR DU TABLEAU DANS LE TEMPS
	function NextGeneration() {
		setTurnNumber(turnNumber + 1);

		//Initialise le tableau de la nouvelle génération
		const next = [];

		// Boucle qui parcourt toutes les cellules dans le tableau d'état
		for (let x = 0; x < cellsState.length; x++) {
			const row = [];

			for (let y = 0; y < cellsState[x].length; y++) {
				let nbVoisinsVivants = 0;

				// Parcours les voisins autour de la cellule en question
				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue;

						const nx = x + dx;
						const ny = y + dy;

						// Vérifie que le voisin est bien dans le tableau (quand on arrive au bord)
						if (
							nx >= 0 &&
							nx < cellsState.length &&
							ny >= 0 &&
							ny < cellsState[0].length
						) {
							if (cellsState[nx][ny] === true) {
								nbVoisinsVivants++;
							}
						}
					}
				}

				const cell = cellsState[x][y];

				// Détermine comment devrait être la nouvelle celule, selon les règles du jeu de la vie

				// Toute cellule vivante avec deux ou trois voisines vivantes vit sur la prochaine génération.
				if (cell && (nbVoisinsVivants === 2 || nbVoisinsVivants === 3)) {
					row.push(true);
				}

				// Toute cellule morte avec exactement trois voisines vivantes devient une cellule vivante, comme si elle se reproduisait.
				else if (cell === false && nbVoisinsVivants === 3) {
					row.push(true);
				}

				// Dans tous les autres cas, elle est morte
				else {
					row.push(false);
				}
			}

			next.push(row);
		}

		setCellsState(next);
	}

	// Boucle temporelle

	useEffect(() => {
		if (!isPlaying) return;

		const intervalId = setInterval(() => {
			NextGeneration();
		}, generationSpeed); // 10 fois par seconde

		return () => clearInterval(intervalId);
	}, [isPlaying, cellsState]);

	const handlePlay = () => setIsPlaying(true);
	const handlePause = () => setIsPlaying(false);
	const handleReset = () => {
		setTurnNumber(0);
		setIsPlaying(false);
		setCellsState(createEmptyDamier(size));
	};

	// Affichage des cellules
	return (
		<section className="flex flex-col lg:flex-row mt-8 ">
			<section className="flex flex-col gap-8  m-auto ">
				<p className="text-2xl">
					Taille du terrain: {size}x{size}
				</p>
				{isPlaying ? (
					<p className="flex text-2xl">Playing...</p>
				) : (
					<section className="flex text-2xl">
						<p>Saisir taille:</p>
						<input
							type="number"
							max={32}
							min={5}
							value={size}
							onChange={(e) => {
								let newSize = Number(e.target.value);
								if (newSize > 32) newSize = 32;								
								setSize(newSize);
							}}
							className="bg-amber-100 text-2xl w-12 ml-6 "
						/>
					</section>
				)}

				<p className="text-2xl">Nb de générations : {turnNumber}</p>

				<section className="flex text-2xl">
					<p>Vitesse: </p>
					<input
						step={50}
						type="number"
						max={10000}
						min={200}
						value={generationSpeed}
						onChange={(e) => {
							let newSpeed = Number(e.target.value);
							if (newSpeed > 10000) newSpeed = 10000;
							if (newSpeed < 200) newSpeed = 200;
							setGenerationSpeed(newSpeed);
						}}
						className="bg-amber-100 text-2xl w-20 ml-6 text-center "
					/>
					<p>ms</p>
				</section>

				<button
					className="border-1 border-amber-600 rounded-lg"
					type="button"
					onClick={NextGeneration}
				>
					⏩​ Génération suivante
				</button>

				{isPlaying ? (
					<button
						className="border-1 border-amber-600 rounded-lg"
						type="button"
						onClick={handlePause}
					>
						🔴​ Pause
					</button>
				) : (
					<button
						className="border-1 border-amber-600 rounded-lg"
						type="button"
						onClick={handlePlay}
					>
						▶️ Jouer
					</button>
				)}

				<button
					className="border-1 border-amber-600 rounded-lg"
					type="button"
					onClick={handleReset}
				>
					❌​​​ Reinitialiser grille
				</button>

				<button
					className="border-1 border-amber-600 rounded-lg"
					type="button"
					onClick={RandomizeGrid}
				>
					❓​ Grille aléatoire
				</button>
			</section>

			<section
				style={{
					"--my-height-phone": `${10 * size}px`,
					"--my-width-phone": `${10 * size}px`,
					"--my-height-desk": `${20 * size}px`,
					"--my-width-desk": `${20 * size}px`,
				}}
				className=" lg:w-[var(--my-width-desk)] lg:h-[var(--my-height-desk)] h-[var(--my-height-phone)] w-[var(--my-width-phone)] flex flex-wrap m-auto mt-6 mb-6"
			>
				{cellsState.map((row, x) =>
					row.map((isAlive, y) => (
						<Cell
							key={`${x}-${y}`}
							isAlive={isAlive}
							setIsAlive={(newState) => toggleCell(x, y, newState)}
						/>
					)),
				)}
			</section>
		</section>
	);
}

export default Damier;
