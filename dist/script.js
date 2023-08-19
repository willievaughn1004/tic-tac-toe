// Includes the board and functions related to the board.
const Gameboard = {
  board: [null, null, null, null, null, null, null, null, null],

  addToken: function (index, token) {
    this.board[index] = token;
  },

  resetBoard: function () {
    this.board = [null, null, null, null, null, null, null, null, null];
  },
};

// This is here to keep track of players, player turns, and player related functions
const PlayerLogic = {
  activePlayer: 1,

  players: [
    {
      player: 1,
      token: "x",
      name: "Player X",
    },
    {
      player: 2,
      token: "o",
      name: "Player O",
    },
  ],

  changePlayer: function() {
    this.activePlayer =
      this.activePlayer === this.players[0].player
        ? this.players[1].player
        : this.players[0].player;

    return this.activePlayer;
  },

  getActivePlayer: function() {
    return this.activePlayer;
  },

  getToken: function() {
    return this.players[this.activePlayer - 1].token;
  },

  changePlayerNames: function(one, two) {
    this.players[0].name = one;
    this.players[1].name = two;
  },
};

// Controls the functionality of Reset Button

// Controls the game and UI.
const controlGameFlow = () => {
  const controller = PlayerLogic;
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

  const restartButton = document.querySelector(".restart");

  const setResetButton = () => {
    Gameboard.resetBoard();
    squares.forEach((square) => (square.innerHTML = ""));
    if (controller.getActivePlayer() === 2) {
      controller.changePlayer();
    }

    playerTurn.innerText = `${controller.players[0].name}'s Turn`;
  };

  restartButton.addEventListener("click", setResetButton);

  const updatePlayerTurn = () => {
    if (controller.getActivePlayer() === 1) {
      playerTurn.textContent = `${controller.players[1].name}'s Turn.`;
    } else {
      playerTurn.textContent = `${controller.players[0].name}'s Turn.`;
    }
  };

  const setWinConditions = () => {
    const currentBoard = Gameboard.board;

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
        playerTurn.textContent = `${controller.players[0].name} wins.`;
        return;
      } else if (
        currentBoard[a] === "o" &&
        currentBoard[b] === "o" &&
        currentBoard[c] === "o"
      ) {
        playerTurn.textContent = `${controller.players[1].name} wins.`;
        return;
      }
    }

    const checkForTie = (elem) => elem !== null;

    if (currentBoard.every(checkForTie)) {
      playerTurn.textContent = "Players are tied.";
      return;
    }
  };

  const playRound = (space) => {
    if (
      playerTurn.textContent === `${controller.players[1].name} wins.` ||
      playerTurn.textContent === `${controller.players[0].name} wins.`
    ) {
      return;
    }

    Gameboard.addToken(space, controller.getToken());
    updatePlayerTurn();
    controller.changePlayer();
    updateBoardVisual(Gameboard.board);
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

const controlUI = () => {
  // Handles Name Modal
  const nameModal = document.querySelector(".name-modal");

  const toggleNameModal = () => {
    nameModal.classList.toggle("active");
  };

  const setNameBtn = document.querySelector(".set_name");
  setNameBtn.addEventListener("click", toggleNameModal);

  window.addEventListener("click", function (e) {
    if (e.target === nameModal) {
      toggleNameModal();
    }
  });

  // Handles changing the player names
  const setNameSubmit = document.querySelector(".submit");
  setNameSubmit.addEventListener("click", function () {
    setPlayerNames();
    toggleNameModal();
  });
};

const setPlayerNames = () => {
  const playerOneName = document.querySelector("#player_1");
  const playerTwoName = document.querySelector("#player_2");
  const controller = Playerlogic;

  console.log(playerOneName.value, playerTwoName.value);

  controller.changePlayerNames(playerOneName.value, playerTwoName.value);
  console.log(controller.players[0].name, controller.players[1].name);
};

controlGameFlow();
controlUI();
