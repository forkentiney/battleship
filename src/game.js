function ship(id) {
	const getDetails = () => {
		if (id === 1) {
			const name = "Carrier";
			const shipLength = 5;
			return { name, shipLength };
		} else if (id === 2) {
			const name = "Battleship";
			const shipLength = 4;
			return { name, shipLength };
		} else if (id === 3) {
			const name = "Destroyer";
			const shipLength = 3;
			return { name, shipLength };
		} else if (id === 4) {
			const name = "Submarine"
			const shipLength = 3;
			return { name, shipLength };
		} else if (id === 5) {
			const name = "Patrol Boat";
			const shipLength = 2;
			return { name, shipLength };
		} else {
			throw new Error("Not a valid ship ID");
		};
	};
	const defenses = getDetails().shipLength;
	const name = getDetails().name;
	const placement = [];
	let damages = 0;
	const hit = () => {
		damages++;
	};
	const isSunk = () => {
		if (defenses > damages) {
			return false;
		} else {
			return true;
		};
	};
	return {
		name,
		defenses,
		placement,
		damages,
		hit,
		isSunk,
	};
};

function gameBoard() {
	const shipIDs = [1, 2, 3, 4, 5];
	const shipPlacements = [];
	const hits = [];
	const misses = [];
	const placeShip = (ship, coordinate, orientation) => {
		// Take the starting coordinate
		const x = coordinate[0];
		const y = coordinate[1];
		const length = ship.defenses;
		// Find the desired coordinates of placed ship
		const possibleCoords = [];
		if (orientation === "horizontal") {
			for (let i = 0; i < ship.defenses; i++) {
				possibleCoords.push([x + i, y]);
			};
		} else if (orientation === "vertical") {
			for (let i = 0; i < ship.defenses; i++) {
				possibleCoords.push([x, y - i]);
			};
		};
		// Check if those coordinates overlap with any others
		const isValid = () => {
			const isOnBoard = (coordinate) => {
				return coordinate[0] <= 9 && coordinate[1] >= 0;
			};

			const isOverlap = (coordA, coordB) => {
				for (let i = 0; i < 2; i++) {
					if (coordA[i] !== coordB[i]) {
						return false;
					};
				};
				return true;
			};

			if (!possibleCoords.every(isOnBoard)) {
				return false;
			} else if (shipPlacements.length === 0) {
				return true;
			} else {
				for (const ship of shipPlacements) {
					const placement = ship.placement;
					for (const coord of placement) {
						for (const newCoord of possibleCoords) {
							if (isOverlap(newCoord, coord)) return false;
						};
					};
				};
				return true;
			};
		};
		// Place ship on board or return error
		if (isValid()) {
			possibleCoords.forEach((coord) => {
				ship.placement.push(coord);
			});
			shipPlacements.push(ship);
		} else {
			return "Invalid location";
		};
	};

	return {
		shipPlacements,
		placeShip,
	}
};

function player() {};

export { 
	ship,
	gameBoard,
	player,
};
