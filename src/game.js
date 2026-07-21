import { createLinkedList } from "./linked-list.js";

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
		damages,
		hit,
		isSunk,
	};
};

function gameboard() {
	const shipPlacements = [];
	const hits = [];
	const misses = [];
	const placeShip = (ship, coordinate, orientation) => {
		// Take the starting coordinate
		const x = coordinate[0];
		const y = coordinate[1];
		// Make each ship have n number of coords stored in an array:
		// shipCoords = []. Check that shipCoords does not contain any other
		// taken coords which are stored in a main gameboard array. If they
		// are in the main array, return an error. If they are not, push the
		// each ship coord into the main array. When the game is played, if
		// a coord is not in the main array, register a miss. There's no 
		// need for the board array with this method.
		for (let i = 0; i < ship.length; i++) {
			if (board[x][y] === 1) {

			}
		}
		// the orientation of a ship.
	  // Check that the space is not occupied
		// and place the ship.
	};
};

function player() {};

export { 
	ship,
	gameboard,
	player,
};
