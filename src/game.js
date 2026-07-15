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
};

function gameboard() {};

function player() {};
