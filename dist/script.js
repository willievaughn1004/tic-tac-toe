function Gameboard() {
  let board = [null, null, null, null, null, null, null, null, null];

  const addToken = (index, token) => {
    board[index] = token;
    console.log(board);
  };

  const displayBoard = () => {
    console.log(board[0], board[1], board[2]);
    console.log(board[3], board[4], board[5]);
    console.log(board[6], board[7], board[8]);
  };

  return {
    addToken,
    displayBoard,
  };
}

function Controller() {
  const gameBoard = Gameboard();

  let activePlayer = 1;

  const players = [
    {
      player: 1,
      token: "x",
    },
    {
      player: 2,
      token: "o",
    },
  ];

  const changePlayer = () => {
    activePlayer =
      activePlayer === players[0].player
        ? players[1].player
        : players[0].player;

    return activePlayer;
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const getToken = () => {
    return players[activePlayer - 1].token;
  };

  const playRound = (space) => {
    gameBoard.addToken(space, getToken());
    changePlayer();
    gameBoard.displayBoard();
  };

  return {
    playRound,
    getActivePlayer,
  };
}

const updateBoardVisual = () => {
  const squares = document.querySelectorAll(".square");

  const controller = Controller();

  const addTokenToBoard = (e) => {
    const newSymbol = document.createElement("i");

    if (controller.getActivePlayer() === 1) {
      newSymbol.setAttribute("class", "fa-solid fa-x");
    } else {
      newSymbol.setAttribute("class", "fa-solid fa-o");
    }

    e.target.append(newSymbol);
    controller.playRound();
    e.target.removeEventListener("click", addTokenToBoard);
  };

  squares.forEach((square) =>
    square.addEventListener("click", addTokenToBoard)
  );
};

updateBoardVisual();
