// Maintains the current game board, adds tokens, resetting the board
const Gameboard = {
  board: [null, null, null, null, null, null, null, null, null],

  addToken: function (index, token) {
    this.board[index] = token;
  },

  resetBoard: function () {
    this.board = [null, null, null, null, null, null, null, null, null];
  },
};

// Handles player turns, win conditions, getting tokens
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

  // Updates the player turn for the next turn
  changePlayer: function () {
    this.activePlayer =
      this.activePlayer === this.players[0].player
        ? this.players[1].player
        : this.players[0].player;

    return this.activePlayer;
  },

  // Get the token of the active player
  getToken: function () {
    return this.players[this.activePlayer - 1].token;
  },

  // Update player names
  changePlayerNames: function (one, two) {
    this.players[0].name = one;
    this.players[1].name = two;
  },

  // Set win status based on the current gameboard.
  setWinConditions: function (currentboard) {
    let winStatus = "";

    // Winning cominations on the gameboard.
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
        winStatus = "Player 1";
      } else if (
        currentboard[a] === "o" &&
        currentboard[b] === "o" &&
        currentboard[c] === "o"
      ) {
        winStatus = "Player 2";
      }
    }

    const checkForTie = (elem) => elem !== null;

    if (currentboard.every(checkForTie)) {
      winStatus = "Tied";
    }

    return winStatus;
  },
};

// Manages gameplay
const controlGameFlow = () => {
  // Clears the gameboard and resets player to player 1
  const setResetButton = (tiles) => {
    Gameboard.resetBoard();
    tiles.forEach((tile) => (tile.innerHTML = ""));
    if (GameLogic.activePlayer === 2) {
      GameLogic.changePlayer();
    }
  };

  // Plays a round of the game
  const playRound = (space) => {
    Gameboard.addToken(space, GameLogic.getToken());
    GameLogic.changePlayer();
  };

  return {
    setResetButton,
    playRound,
  };
};

// Handles UI interactions
const controlUI = () => {
  const gameFlow = controlGameFlow();

  // Event listener and variables for the gameboard
  const squares = document.querySelectorAll(".square");

  squares.forEach((tile) =>
    tile.addEventListener("click", function () {
      if (this.innerHTML === "") {
        if (!GameLogic.setWinConditions(Gameboard.board)) {
          const tile = this.getAttribute("id");
          updatePlayerStatus();
          gameFlow.playRound(tile);
          updateWinStatus();
          updateBoardUI();
        }
      }
    })
  );

  // Even listener and variables for the set name button
  const setNameBtn = document.querySelector(".set_name");
  setNameBtn.addEventListener("click", toggleNameModal);

  window.addEventListener("click", (e) => {
    if (e.target === nameModal) {
      toggleNameModal();
    }
  });

  // Variables for the name modal element
  const nameModal = document.querySelector(".name-modal");

  // Toggles visibilty of the name modal
  const toggleNameModal = () => {
    nameModal.classList.toggle("active");
  };

  // Handles changing the player names after submitting new names
  // TODO: Add ability to use submit button with the enter key
  const setNameSubmit = document.querySelector(".submit");
  setNameSubmit.addEventListener("click", () => {
    setPlayerNames();
    toggleNameModal();
    gameFlow.setResetButton(squares);
    resetCurrentPlayerName();
  });

  // Reset button variable and event listener
  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", () => {
    gameFlow.setResetButton(squares);
    resetCurrentPlayerName();
  });

  // Update the UI to display the current game board.
  const updateBoardUI = () => {
    for (let i = 0; i < Gameboard.board.length; i++) {
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

  // Updates current player to reflect the active player
  const updatePlayerStatus = () => {
    if (GameLogic.activePlayer === 1) {
      playerTurn.textContent = `${GameLogic.players[1].name}'s Turn`;
    } else {
      playerTurn.textContent = `${GameLogic.players[0].name}'s Turn`;
    }
  };

  // Updates player status UI to reflect the current win status
  const updateWinStatus = () => {
    const winStatus = GameLogic.setWinConditions(Gameboard.board);

    if (winStatus === "Player 1") {
      playerTurn.textContent = `${GameLogic.players[0].name} wins!`;
      return;
    } else if (winStatus === "Player 2") {
      playerTurn.textContent = `${GameLogic.players[1].name} wins!`;
      return;
    } else if (winStatus === "Tied") {
      playerTurn.textContent = "Players are tied.";
      return;
    }
  };

  // Changes the player names within the GameLogic object.
  const setPlayerNames = () => {
    const playerOneName = document.querySelector("#player_1");
    const playerTwoName = document.querySelector("#player_2");

    GameLogic.changePlayerNames(playerOneName.value, playerTwoName.value);
  };

  // Resets player name to reflect player 1's name.
  const resetCurrentPlayerName = () => {
    playerTurn.textContent =
      GameLogic.activePlayer === 1
        ? `${GameLogic.players[0].name}'s Turn`
        : `${GameLogic.players[1].name}'s Turn`;
  };
};

controlUI();
