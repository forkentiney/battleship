import interact from 'interactjs';
import './style.css';
import red from "./static/icons/circle-fill-red.svg";
import white from "./static/icons/circle-fill-white.svg";
import empty from "./static/icons/circle.svg";
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

	const allCells = document.querySelectorAll(".cell");

	const ships = document.querySelectorAll(".ship");
	const carrier = document.querySelector('#carrier');
	const battleship = document.querySelector('#battleship');
	const destroyer = document.querySelector('#destroyer');
	const submarine = document.querySelector('#submarine');
	const patrolBoat = document.querySelector('#patrol-boat');

	const start = document.querySelector('#start');
	const messages = document.querySelector('#messages');
	const message = messages.querySelector("h3");
	const gameOverButton = messages.querySelector("button");
	
	gameOverButton.addEventListener('click', () => {
		start.classList.remove("hidden");
		allCells.forEach(cell => {
			updateCell(cell, "reset");
		});
		ships.forEach(ship => {
			ship.style.pointerEvents = "auto";
		});
		messages.classList.add("hidden");
		playerGameBoard.resetBoard();
		computerBoard.resetBoard();
	});

	// Take arranged ships on board and attempt to place them in the game
	const placePlayerShips = (boat) => {
			const id = boat.parentElement.id;
			const boatStyle = boat.style;
			const coord = [parseInt(id.charAt(1)), parseInt(id.charAt(2))];

			let orientation;
			if (boatStyle.getPropertyValue('height') === "100%") {
				orientation = "horizontal";
			} else {
				orientation = "vertical";
			};

			let i;
			if (boat.id === "carrier") {
				i = 1;
			} else if (boat.id === "battleship") {
				i = 2;
			} else if (boat.id === "destroyer") {
				i = 3;
			} else if (boat.id === "submarine") {
				i = 4;
			} else if (boat.id === "patrol-boat") {
				i = 5;
			};

			console.log(`Coord: ${coord}, Orientation: ${orientation}, Ship: ${i}`);

			if (playerGameBoard.placeShip(ship(i), coord, orientation) === "Invalid location") {
				return false;
			} else {
				return true;
			};
	};

	start.addEventListener("click", () => {
		if ([...ships].every(placePlayerShips)) {
			placeComputerShips();
			playing = true;
			ships.forEach(ship => {
				ship.style.pointerEvents = "none";
			});
			start.classList.add("hidden");
		} else {
			message.textContent = "Be sure to place ships appropriately";
			messages.classList.remove("hidden");
		};
	});

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

	interact('#player > .cell').dropzone({
		accept: '.ship',
		overlap: 'pointer',

		ondragenter: function (event) {
			event.target.classList.add('dragging-over')
		},
		ondragleave: function (event) {
			event.target.classList.remove('dragging-over')
		},
		ondrop: function (event) {
			event.target.classList.remove('dragging-over')
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
			if (playing) {
				updateCell(cell, "shake");
				console.log("You cannot fire into your own waters");
			};
		});
	});

	compCells.forEach(cell => {
		cell.addEventListener("click", () => {
			if (playing) attackSpot(computerBoard, cell)
			else return;
		});
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

	const placeComputerShips = () => {
		for (let i = 1; i < 6; i++) {
			function placeShip() {
				const coord = createCoord();
				const orientation = createOrientation();
				if (computerBoard.placeShip(ship(i), coord, orientation) === "Invalid location") placeShip();
			};
			placeShip();
		};
	};

	
	const attackSpot = (board, spot) => {
		const coord = [parseInt(spot.id.charAt(1)), parseInt(spot.id.charAt(2))];
		const result = board.receiveAttack(coord);
		const bullet = document.createElement("div");
		bullet.textContent = "·";
		bullet.classList.add("bullet");
		spot.appendChild(bullet);
		console.log(result);
		if (result === "You hit!") {
			bullet.addEventListener('animationend', () => {
				bullet.remove();
				updateCell(spot, "red");
				if (board.areAllShipsSunk()) {
					playing = false;
					if (board === computerBoard) {
						message.textContent = "You Win!";
					} else {
						message.textContent = "You Lose!";
					}
					messages.classList.remove("hidden");
				};
			});
		} else if (result === "You missed.") {
			bullet.addEventListener('animationend', () => {
				bullet.remove();
				updateCell(spot, "white");
			});
		} else {
			if (spot.id.charAt(0) === "c") {
				bullet.remove();
				updateCell(spot, "shake");
				return;
			} else {
				bullet.remove();
				computerMove();
			}
		};
		if (spot.id.charAt(0) === "c") {
			bullet.addEventListener('animationend', () => {
				bullet.remove();
				computerMove();
			});
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
		} else if (type === "reset") {
			cellImg.src = empty;
			cellImg.alt = "o";
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
