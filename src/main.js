import interact from 'interactjs';
import './style.css';
import red from "./static/icons/circle-fill-red.svg";
import white from "./static/icons/circle-fill-white.svg";
import {
	player,
	ship,
	gameBoard,
} from './game.js';

const playGame = () => {
	let playing = false;
	// Select DOM elements and create gameboards
	const playerBoard = document.querySelector("#player");
	const playerCells = document.querySelectorAll("#player > *");
	const playerGameBoard = gameBoard();
	const compBoard = document.querySelector("#computer");
	const compCells = document.querySelectorAll("#computer > *");
	const computerBoard = gameBoard();

	const ships = document.querySelectorAll(".ship");
	const carrier = document.querySelector('#carrier');
	const battleship = document.querySelector('#battleship');
	const destroyer = document.querySelector('#destroyer');
	const submarine = document.querySelector('#submarine');
	const patrolBoat = document.querySelector('#patrol-boat');

	ships.forEach(ship => {
		ship.addEventListener("click", () => {
			if (playing) return;
			rotateShip(ship);
		});
	});

	const rotateShip = (ship) => {
		const shipStyle = ship.style;
		const height = shipStyle.getPropertyValue('height');
		const width = shipStyle.getPropertyValue('width');
		ship.style.height = width;
		ship.style.width = height;
	};

	interact('#player > *').dropzone({
		accept: '.ship',
		overlap: 'pointer',

		ondragenter: function (event) {
			let dropzoneElement = event.target
		},
		ondragleave: function (event) {
			event.target.classList.remove('ship')
		},
		ondrop: function (event) {
			event.target.classList.remove('ship')
			event.target.appendChild(event.relatedTarget)
			event.relatedTarget.style.transform = 'none'
		}
	})

	const position = { x: 0, y: 0 };
	interact('.ship')
		.draggable({
			listeners: {
				move (event) {
					position.x += event.dx
					position.y += event.dy

					event.target.style.transform =
						`translate(${position.x}px, ${position.y}px)`
				},
				end (event) {
					position.x = 0;
					position.y = 0;
				},
			},
			modifiers: [
				interact.modifiers.restrictRect({
					restriction: '#player',
					endOnly: true
				})
			]
		})

	playerCells.forEach(cell => {
		cell.addEventListener("click", () => {
			updateCell(cell, "shake");
			console.log("You cannot fire into your own waters");
		});
	});

	compCells.forEach(cell => {
		cell.addEventListener("click", () => attackSpot(computerBoard, cell));
	});

	const createCoord = () => {
		const coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
		return coord;
	};
	
	const createOrientation = () => {
		const coinflip = Math.round(Math.random());
		if (coinflip === 0) {
			return "vertical";
		} else if (coinflip === 1) {
			return "horizontal";
		};
	};

	// Place computer ships on board IIFE
	const placeComputerShips = (() => {
		for (let i = 1; i < 6; i++) {
			function placeShip() {
				const coord = createCoord();
				const orientation = createOrientation();
				if (computerBoard.placeShip(ship(i), coord, orientation) === "Invalid location") placeShip();
			};
			placeShip();
		};
	})();

	const placePlayerShips = (() => {
		// This function should place ships randomly.
		// For now, placements are static.
		playerGameBoard.placeShip(ship(1), [6, 6], "vertical");
		playerGameBoard.placeShip(ship(2), [0, 2], "horizontal");
		playerGameBoard.placeShip(ship(3), [1, 8], "horizontal");
		playerGameBoard.placeShip(ship(4), [2, 6], "vertical");
		playerGameBoard.placeShip(ship(5), [8, 8], "horizontal");
	})();
	
	const attackSpot = (board, spot) => {
		const coord = [parseInt(spot.id.charAt(1)), parseInt(spot.id.charAt(2))];
		const result = board.receiveAttack(coord);
		console.log(result);
		if (result === "You hit!") {
			updateCell(spot, "red");
		} else if (result === "You missed.") {
			updateCell(spot, "white");
		} else {
			if (spot.id.charAt(0) === "c") {
				updateCell(spot, "shake");
				return;
			} else computerMove();
		};
		if (spot.id.charAt(0) === "c") computerMove();
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

	function computerMove() {
		const coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
		const cell = document.querySelector(`#p${coord[0]}${coord[1]}`);
		attackSpot(playerGameBoard, cell);
	};
};

playGame();
