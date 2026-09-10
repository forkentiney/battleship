import './style.css';
import {
	player,
	ship,
	gameBoard,
} from './game.js';

const playerBoard = document.querySelector("#player");
const compBoard = document.querySelector("#computer");

const cells = document.querySelectorAll(".cell");
const computerBoard = gameBoard();

cells.forEach(cell => {
	cell.addEventListener("click", () => checkHit(computerBoard, cell.id));
});


computerBoard.placeShip(ship(2), [0, 2], "horizontal");

function checkHit(board, spot) {
	const coord = [parseInt(spot.charAt(0)), parseInt(spot.charAt(1))];
	const result = board.receiveAttack(coord);
	console.log(result);
	return result;
};
