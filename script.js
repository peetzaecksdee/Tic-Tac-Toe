function initGameBoard() {
	let gameBoard = [
		" ", " ", " ", 
		" ", " ", " ", 
		" ", " ", " "];

	const getBoard = () => {
		return gameBoard;
	};

	const getVal = (num) => {
		return gameBoard[num];
	};

	const resetBoard = () =>
		(gameBoard = [
			" ", " ", " ", 
			" ", " ", " ", 
			" ", " ", " "]);

	const place = (num, val) => {
		gameBoard[num] = val;
		console.log(gameBoard);
	};

	return { getBoard, getVal, resetBoard, place };
}

/**
 * start the game
 */
function gameLogic() {
	const gameBoard = initGameBoard();
	let turnX = true;
	// DOM thingies
	const btnBoxes = document.querySelectorAll(".btn-box");
	const restartBtn = document.querySelector(".restart-btn");
	const announcer = document.querySelector(".announcer");
	// console.log("Please enter a number.");

	/** 
	This is for checking the rows ofc
	@returns {boolean}boolean: true false
	*/
	const checkRows = () => {
		for (i = 0; i < 3; i++) {
			let row = [];
			for (j = i * 3; j < i * 3 + 3; j++) row.push(gameBoard.getVal(j));

			if (row.every((val) => val == "X") || row.every((val) => val == "O"))
				return true;
		}

		return false;
	};

	const checkColumns = () => {
		for (i = 0; i < 3; i++) {
			let column = [];
			for (j = i; j < 9; j += 3) column.push(gameBoard.getVal(j));

			if (
				column.every((val) => val === "X") ||
				column.every((val) => val === "O")
			)
				return true;
		}

		return false;
	};

	const checkDiagonal = () => {
		let diagonals = [
			[gameBoard.getVal(0), gameBoard.getVal(4), gameBoard.getVal(8)],
			[gameBoard.getVal(2), gameBoard.getVal(4), gameBoard.getVal(6)],
		];
		if (
			diagonals[0].every((val) => val === "X") ||
			diagonals[0].every((val) => val === "O")
		)
			return true;
		if (
			diagonals[1].every((val) => val === "X") ||
			diagonals[1].every((val) => val === "O")
		)
			return true;

		return false;
	};

	const checkIfDraw = () => {
		if (!gameBoard.getBoard().some((val) => val == " ")) return true;
	};

	const checkIfPlacable = (num) => {
		if (gameBoard.getVal(num) !== " ") {
			// console.log("This point has already been taken.");
			return false;
		}

		return true;
	};

	const checkWin = () => {
		if (checkRows() || checkColumns() || checkDiagonal()) return true;

		return false;
	};

	const lockBoard = () => {
		btnBoxes.forEach((btn) => {
			btn.setAttribute("disabled", "");
		});
	};

	const getCurrentTurn = () => {
		return turnX ? "X" : "O";
	}

	const place = (num) => {
		/* if (num < 0 || num > 8) {
			console.log("Please enter a valid placement.");
			return false;
		} */

		if (!checkIfPlacable(num)) return false;

		const currentTurn = getCurrentTurn()

		gameBoard.place(num, currentTurn);
		//console.log(gameBoard.getBoard());

		if (checkWin()) {
			//console.log(`${turnO ? "O" : "X"} Win!`);
			announcer.textContent = `${currentTurn} Win!`;
			lockBoard();
		} else if (checkIfDraw()) {
			//console.log("Game is drawn.")
			announcer.textContent = "Game is drawn.";
			lockBoard();
		} else {
			turnX = !turnX;
			announcer.textContent = `${getCurrentTurn()}'s turn`;
		}

		return currentTurn;
	};

	const resetGame = () => {
		gameBoard.resetBoard();
		turnX = Math.round(Math.random()) === 1 ? false : true;
		announcer.textContent = `${getCurrentTurn()}'s turn`;
		btnBoxes.forEach((btn) => {
			btn.querySelector("span").textContent = "";
			btn.removeAttribute("disabled");
		});
	};

	// Loop through the array of btnBoxes
	for (let i = 0; i < btnBoxes.length; i++) {
		const curBtnBox = btnBoxes[i];
		curBtnBox.addEventListener("click", () => {
			const placePos = place(i);

			if (placePos) {
				curBtnBox.querySelector("span").textContent = placePos;
			}
		});
	}

	// Reset button
	restartBtn.addEventListener("click", () => resetGame());

	// Announcer
	announcer.textContent = `${getCurrentTurn()}'s turn`;

	return { place, checkWin, resetGame };
}

gameLogic();
