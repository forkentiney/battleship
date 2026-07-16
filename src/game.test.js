import {
	ship,
	gameboard,
	player,
} from './game.js';

test('Created Carrier', () => {
	expect(ship(5).defenses).toBe(5);
});
