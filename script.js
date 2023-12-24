function initGameBoard() {
	let gameBoard = [
		[" ", " ", " "],
		[" ", " ", " "],
		[" ", " ", " "],
	];

	const getBoard = () => {
		return gameBoard;
	};

	const resetBoard = () =>
		(gameBoard = [
			[" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "],
		]);

	const place = (row, column, val) => {
		gameBoard[row][column] = val;
	};

	return { getBoard, resetBoard, place };
}

function gameLogic() {
	const gameBoard = initGameBoard();
	let turnO = true;

	const place = (num) => {
		if (num < 1 || num > 9) {
			console.log("Please give a valid placement.");
			return;
		}

    num--;
    let row = Math.floor(num / 3);
    let column = num % 3;

		if (gameBoard.getBoard()[row][column] !== " ") {
			console.log("This point has already been taken.");
			return;
		}

		gameBoard.place(row, column, turnO ? "O" : "X");
		turnO = !turnO;
		console.log(gameBoard.getBoard());
	};

	return { place };
}
