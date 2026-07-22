import {
	ship,
	gameBoard,
	player,
} from './game.js';

test('Created Patrol Boat', () => {
	expect(ship(5).defenses).toBe(2);
	expect(ship(5).name).toBe("Patrol Boat");
});

test('Place ship horizontally on board', () => {
	const board = gameBoard();
	board.placeShip(ship(1), [0, 0], "horizontal");
	expect(board.shipPlacements[0].placement).toStrictEqual([ [0, 0], [1, 0], [2, 0], [3, 0], [4, 0] ]);
});

test('Place ship vertically on board', () => {
	const board = gameBoard();
	board.placeShip(ship(2), [0, 3], "vertical");
	expect(board.shipPlacements[0].placement).toStrictEqual([ [0, 3], [0, 2], [0, 1], [0, 0] ]);
});

test('Ship must be on board', () => {
	const board = gameBoard();
	expect(board.placeShip(ship(2), [0, 2], "vertical")).toBe("Invalid location");
});

test('Place two ships on board', () => {
	const board = gameBoard();
	board.placeShip(ship(2), [0, 3], "vertical");
	board.placeShip(ship(2), [1, 4], "horizontal");
	expect(board.shipPlacements.length).toBe(2);
	expect(board.shipPlacements[0].placement).toStrictEqual([ [0, 3], [0, 2], [0, 1], [0, 0] ]);
	expect(board.shipPlacements[1].placement).toStrictEqual([ [1, 4], [2, 4], [3, 4], [4, 4] ]);
});

test('Ships cannot overlap', () => { // This test does not work
	const board = gameBoard();
	board.placeShip(ship(1), [0, 0], "horizontal");
	expect(board.placeShip(ship(2), [0, 3], "vertical")).toBe("Invalid location");
});
