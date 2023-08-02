//

function Gameboard() {
  let board = [null, null, null, null, null, null, null, null, null];

  const addToken = (index, token) => {
    board[index] = token;
    console.log(board);
  };

  const getBoard = () => {
    return board;
  };

  const displayBoard = () => {
    console.log(board[0], board[1], board[2]);
    console.log(board[3], board[4], board[5]);
    console.log(board[6], board[7], board[8]);
  };

  return {
    addToken,
    getBoard,
    displayBoard,
  };
}

function GameLogic() {
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

  return {
    getToken,
    changePlayer,
    getActivePlayer,
  };
}

const controlGameFlow = () => {
  const gameBoard = Gameboard();
  const controller = GameLogic();

  const squares = document.querySelectorAll(".square");

  const updateBoardVisual = (board) => {

    for (i = 0; i <= board.length; i++) {
      const newSymbol = document.createElement("i");

      if (board[i] === "x") {
        newSymbol.setAttribute("class", "fa-solid fa-x");
      } else if (board[i] === "o") {
        newSymbol.setAttribute("class", "fa-solid fa-o");
      } else {
        continue;
      }

      if (!squares[i].innerHTML) {
        squares[i].append(newSymbol);
      }
    }
  };

  const playRound = (space) => {
    gameBoard.addToken(space, controller.getToken());
    controller.changePlayer();
    gameBoard.displayBoard();
    updateBoardVisual(gameBoard.getBoard());
  };

  squares.forEach((square) =>
    square.addEventListener("click", function (event) {
      const tile = event.target.getAttribute("id");
      playRound(tile);
    })
  );
};

controlGameFlow();

/* Win coniditions 



*/