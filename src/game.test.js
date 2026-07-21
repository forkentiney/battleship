import {
	ship,
	gameboard,
	player,
} from './game.js';

test('Created Patrol Boat', () => {
	expect(ship(5).defenses).toBe(2);
	expect(ship(5).name).toBe("Patrol Boat");
});
