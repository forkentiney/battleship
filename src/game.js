function ship(length) {
	const defenses = length;
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
		defenses,
		damages,
		hit,
		isSunk,
	};
};

function gameboard() {
	const board = [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ];
	const placeShip = (coordinate, orientation) => {
		// Take the starting coordinate and
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
