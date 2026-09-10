import './style.css';
import {
	player,
	ship,
	gameBoard,
} from './game.js';
import red from "./static/icons/circle-fill-red.svg";
import white from "./static/icons/circle-fill-white.svg";

const playerBoard = document.querySelector("#player");
const compBoard = document.querySelector("#computer");

const playerCells = document.querySelectorAll("#player > *");
const compCells = document.querySelectorAll("#computer > *");

const computerBoard = gameBoard();

playerCells.forEach(cell => {
	cell.addEventListener("click", () => {
		updateCell(cell, "shake");
		console.log("You cannot fire into your own waters");
	});
});

compCells.forEach(cell => {
	cell.addEventListener("click", () => checkHit(computerBoard, cell));
});

computerBoard.placeShip(ship(2), [0, 2], "horizontal");

function checkHit(board, spot) {
	const coord = [parseInt(spot.id.charAt(1)), parseInt(spot.id.charAt(2))];
	const result = board.receiveAttack(coord);
	console.log(result);
	if (result === "You hit!") {
		updateCell(spot, "red");
	} else if (result === "You missed.") {
		updateCell(spot, "white");
	} else {
		updateCell(spot, "shake");
	};
	return result;
};

function updateCell(cell, type) {
	const cellImg = cell.firstElementChild;
	if (type === "red") {
		cellImg.src = red;
		cellImg.alt = "x";
	} else if (type === "white") {
		cellImg.src = white;
		cellImg.alt = "-";
	} else {
		cellImg.classList.add("shake");
		cellImg.addEventListener("animationend", () => {
			cellImg.classList.remove("shake");
		}, { once: true });
	};
};
