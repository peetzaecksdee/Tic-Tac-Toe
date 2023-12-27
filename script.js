/**
 * This function delays the thingy
 * @param {number} milliseconds 
 * @returns {Promise} TimeoutPromise
 */
function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function initGameBoard() {
	let gameBoard = [
		" ", " ", " ",
		" ", " ", " ",
		" ", " ", " ",
	];

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
			" ", " ", " ",
		]);

	const place = (num, val) => {
		gameBoard[num] = val;
	};

	return { getBoard, getVal, resetBoard, place };
}

/**
 * start the game
 */
function gameLogic() {
	const gameBoard = initGameBoard();
	let turnO = true;
	console.log("Please enter a number.");

	/** 
	This is for checking the rows ofc
	@returns {boolean}boolean: true false
	*/
	const checkRows = () => {
		for (i = 0; i < 3; i++) {
			let row = [];
			for (j = i * 3; j < i * 3 + 3; j++)
			row.push(gameBoard.getVal(j));
		
			if (row.every(val => val == "X") || row.every(val => val == "O"))
				return true;
			
		}

		return false;
	};

	const checkColumns = () => {
		for (i = 0; i < 3; i++) {
			let column = [];
			for (j = i; j < 9; j+=3)
			column.push(gameBoard.getVal(j));
			

			if (column.every(val => val == "X") || column.every(val => val == "O"))
				return true;
			
		}

		return false;
	};

	const checkDiagonal = () => {
		let diagonal1 = [gameBoard.getVal(0), gameBoard.getVal(4), gameBoard.getVal(8)];
		let diagonal2 = [gameBoard.getVal(2), gameBoard.getVal(4), gameBoard.getVal(6)];
		return diagonal1.every(val => val == "X") || diagonal2.every(val => val == "O");
	};

	const checkIfDraw = () => {
		if (!gameBoard.getBoard().some(val => val == " ")) 
			return true;
	}

	const checkIfPlacable = (num) => {
		if (gameBoard.getVal(num) !== " ") {
			console.log("This point has already been taken.");
			return false;
		}

		return true
	};

	const checkWin = () => {
		if (checkRows() || checkColumns() || checkDiagonal())
			return true;
		
		return false;
	}

	const place = (num) => {

		if (num < 0 || num > 8) {
			console.log("Please enter a valid placement.");
			return false;
		}

		if (!checkIfPlacable(num))
			return false;

		gameBoard.place(num, turnO ? "O" : "X");
		console.log(gameBoard.getBoard());
		
		if (checkWin()) {
			console.log(`${turnO ? "O" : "X"} Win!`);
			resetGame();
			return false;
		};

		if (checkIfDraw()) {
			console.log(gameBoard.getBoard());
			console.log("The game ended in a draw.");
			resetGame();
			return false;
		};
		
		turnO = !turnO;
	};

	const resetGame = () => {
		gameBoard.resetBoard();
		turnO = true;
		console.log("Please enter a number.");
	};

	return { place, checkWin };
}