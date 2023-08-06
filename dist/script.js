//

const Gameboard = {
  board: [null, null, null, null, null, null, null, null, null],

  addToken: function (index, token) {
    this.board[index] = token;
  },

  getBoard: function () {
    return this.board;
  },

  displayBoard: function () {
    console.log(this.board[0], this.board[1], this.board[2]);
    console.log(this.board[3], this.board[4], this.board[5]);
    console.log(this.board[6], this.board[7], this.board[8]);
  },

  resetBoard: function () {
    this.board = [null, null, null, null, null, null, null, null, null];
  },
};

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

const controlGameFlow = () => {
  const controller = setGameLogic();

  const squares = document.querySelectorAll(".square");

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

  //   const setWinConditions = () => {
  //     const currentGameBoard = Gameboard.getBoard();

  //     if (Game) {
  //     }
  //   };

  const restartButton = document.querySelector(".restart");
  const setResetButton = () => {
    Gameboard.resetBoard();
  };

  restartButton.addEventListener("click", setResetButton);

  const updatePlayerTurn = () => {
    const playerTurn = document.querySelector(".player-turn");

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
    Gameboard.displayBoard();
    updateBoardVisual(Gameboard.getBoard());
  };

  squares.forEach((square) =>
    square.addEventListener("click", function () {
      if (this.innerHTML === "") {
        const tile = this.getAttribute("id");
        console.log(this.innerHTML)
        playRound(tile);
      }
    })
  );
};

controlGameFlow();
