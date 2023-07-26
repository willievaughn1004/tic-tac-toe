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
  };
}

const gameOne = Controller();

gameOne.playRound(0);
gameOne.playRound(1);
gameOne.playRound(2);
gameOne.playRound(3);

// const updateBoardVisual = () => {
//     const squares = document.querySelectorAll(".square");

//     squares.forEach((square) =>
//       square.addEventListener("click", function (e) {
//         let newSymbol = document.createElement("i");
//         newSymbol.setAttribute("class", "fa-solid fa-x");
//         e.target.append(newSymbol);
//       })
//     );
//   };

// updateBoardVisual();
