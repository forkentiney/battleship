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

function gameboard() {};

function player() {};

export { 
	ship,
	gameboard,
	player,
};
