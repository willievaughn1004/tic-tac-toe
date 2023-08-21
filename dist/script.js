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
const GameLogic = {
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

  changePlayer: function () {
    this.activePlayer =
      this.activePlayer === this.players[0].player
        ? this.players[1].player
        : this.players[0].player;

    return this.activePlayer;
  },

  getActivePlayer: function () {
    return this.activePlayer;
  },

  getToken: function () {
    return this.players[this.activePlayer - 1].token;
  },

  changePlayerNames: function (one, two) {
    this.players[0].name = one;
    this.players[1].name = two;
  },

  resetCurrentPlayerName: function () {
    let currentPlayer = document.querySelector(".player-turn");

    if (this.activePlayer === 1) {
      currentPlayer.innerText = `${this.players[0].name}'s Turn`;
    } else {
      currentPlayer.innerText = `${this.players[1].name}'s Turn`;
    }
  },
};

// Sets win conditions

// Controls the game and UI.
const controlGameFlow = () => {
  const playerTurn = document.querySelector(".player-turn");

  const setResetButton = function (tiles) {
    Gameboard.resetBoard();
    tiles.forEach((tile) => (tile.innerHTML = ""));
    if (GameLogic.getActivePlayer() === 2) {
      GameLogic.changePlayer();
    }

    playerTurn.innerText = `${GameLogic.players[0].name}'s Turn`;
  };

  const setWinConditions = function (currentboard) {
    const winStatus = '';

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
        currentboard[a] === "x" &&
        currentboard[b] === "x" &&
        currentboard[c] === "x"
      ) {
        return `${GameLogic.players[0].name} wins`;
      } else if (
        currentboard[a] === "o" &&
        currentboard[b] === "o" &&
        currentboard[c] === "o"
      ) {
        return `${GameLogic.players[1].name} wins`;
      }
    }

    const checkForTie = (elem) => elem !== null;

    if (currentboard.every(checkForTie)) {
      return "Players are tied.";
    }
  };

  const playRound = (space) => {
    Gameboard.addToken(space, GameLogic.getToken());
    GameLogic.changePlayer();
  };

  return {
    setResetButton,
    playRound,
    setWinConditions,
  };
};

const controlUI = () => {
  // Handles Name Modal
  const nameModal = document.querySelector(".name-modal");
  const gameFlow = controlGameFlow();

  const toggleNameModal = () => {
    nameModal.classList.toggle("active");
  };

  // Squares event listener
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) =>
    square.addEventListener("click", function () {
      if (this.innerHTML === "") {
        if (!gameFlow.setWinConditions(Gameboard.board)) {
          const tile = this.getAttribute("id");
          updatePlayerStatus();
          gameFlow.playRound(tile);
          updateBoardUI();
        }
      }
    })
  );

  // Set name button
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
    gameFlow.setResetButton(squares);
    GameLogic.resetCurrentPlayerName();
  });

  // Reset button variable and event listener
  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", function () {
    gameFlow.setResetButton(squares);
  });

  const updateBoardUI = () => {
    for (i = 0; i < Gameboard.board.length; i++) {
      const newSymbol = document.createElement("i");

      if (Gameboard.board[i] === "x") {
        newSymbol.setAttribute("class", "fa-solid fa-x");
      } else if (Gameboard.board[i] === "o") {
        newSymbol.setAttribute("class", "fa-solid fa-o");
      } else {
        continue;
      }

      if (!squares[i].innerHTML) {
        squares[i].append(newSymbol);
      }
    }
  };

  const playerTurn = document.querySelector(".player-turn");
  const updatePlayerStatus = () => {
    if (gameFlow.setWinConditions() === ) 

    if (GameLogic.getActivePlayer() === 1) {
      playerTurn.textContent = `${GameLogic.players[1].name}'s Turn`;
    } else {
      playerTurn.textContent = `${GameLogic.players[0].name}'s Turn`;
    }
  };

  const setPlayerNames = () => {
    const playerOneName = document.querySelector("#player_1");
    const playerTwoName = document.querySelector("#player_2");

    GameLogic.changePlayerNames(playerOneName.value, playerTwoName.value);
  };
};

controlUI();

/*

Change the code so it is more modal

Add enter button as a way to hit the submit button for the set names button

redo Reset button function so it is more modular
*/
