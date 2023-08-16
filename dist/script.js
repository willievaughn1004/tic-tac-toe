// Includes the board and functions related to the board.
const Gameboard = {
  board: [null, null, null, null, null, null, null, null, null],

  addToken: function (index, token) {
    this.board[index] = token;
  },

  getBoard: function () {
    return this.board;
  },

  resetBoard: function () {
    this.board = [null, null, null, null, null, null, null, null, null];
  },
};

// This is here to keep track of players, player turns, and player related functions
function setGameLogic() {
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

// Controls the game and UI.
const controlGameFlow = () => {
  const controller = setGameLogic();
  const squares = document.querySelectorAll(".square");
  const playerTurn = document.querySelector(".player-turn");

  const updateBoardVisual = (board) => {
    for (i = 0; i < board.length; i++) {
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

  const setWinConditions = () => {
    if (
      playerTurn.textContent === "Player O wins." ||
      playerTurn.textContent === "Player X wins."
    ) {
      return;
    }

    const currentBoard = Gameboard.getBoard();

    const winScenarios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winScenarios) {
      const [a, b, c] = combination;

      if (
        currentBoard[a] === "x" &&
        currentBoard[b] === "x" &&
        currentBoard[c] === "x"
      ) {
        playerTurn.textContent = "Player X wins.";
        return;
      } else if (
        currentBoard[a] === "o" &&
        currentBoard[b] === "o" &&
        currentBoard[c] === "o"
      ) {
        playerTurn.textContent = "Player O wins.";
        return;
      }
    }

    const checkForTie = (elem) => elem !== null;

    if (currentBoard.every(checkForTie)) {
      playerTurn.textContent = "Players are tied.";
      return;
    }
  };

  const restartButton = document.querySelector(".restart");

  const setResetButton = () => {
    Gameboard.resetBoard();
    squares.forEach((square) => (square.innerHTML = ""));
    if (controller.getActivePlayer() === 2) {
      controller.changePlayer();
    }

    playerTurn.innerText = "Player X's Turn";
  };

  restartButton.addEventListener("click", setResetButton);

  const updatePlayerTurn = () => {
    if (
      playerTurn.textContent === "Player O wins." ||
      playerTurn.textContent === "Player X wins."
    ) {
      return;
    }

    if (controller.getActivePlayer() === 1) {
      playerTurn.textContent = "Player O's Turn";
    } else {
      playerTurn.textContent = "Player X's Turn";
    }
  };

  const playRound = (space) => {
    Gameboard.addToken(space, controller.getToken());
    updatePlayerTurn();
    controller.changePlayer();
    updateBoardVisual(Gameboard.getBoard());
    setWinConditions();
  };

  squares.forEach((square) =>
    square.addEventListener("click", function () {
      if (this.innerHTML === "") {
        const tile = this.getAttribute("id");
        playRound(tile);
      }
    })
  );
};

controlGameFlow();
