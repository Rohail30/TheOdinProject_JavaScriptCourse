// === Gameboard Module ===
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const resetBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);
  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const isFull = () => board.every(cell => cell !== "");

  const checkWinner = () => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],  // rows
      [0,3,6], [1,4,7], [2,5,8],  // cols
      [0,4,8], [2,4,6]            // diagonals
    ];

    for (const [a,b,c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return { getBoard, setMark, resetBoard, checkWinner, isFull };
})();

// === Player Factory ===
const Player = (name, mark) => {
  return { name, mark };
};

// === Game Controller ===
const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const startGame = (player1Name, player2Name) => {
    players = [Player(player1Name, "X"), Player(player2Name, "O")];
    currentPlayerIndex = 0;
    Gameboard.resetBoard();
    gameOver = false;
    DisplayController.render();
    DisplayController.updateStatus(`${players[currentPlayerIndex].name}'s turn`);
  };

  const playRound = (index) => {
    if (gameOver) return;

    const currentPlayer = players[currentPlayerIndex];
    const successfulMove = Gameboard.setMark(index, currentPlayer.mark);

    if (!successfulMove) return; // spot already taken

    DisplayController.render();

    const winner = Gameboard.checkWinner();
    if (winner) {
      DisplayController.updateStatus(`${currentPlayer.name} wins!`);
      gameOver = true;
      return;
    }

    if (Gameboard.isFull()) {
      DisplayController.updateStatus(`It's a tie!`);
      gameOver = true;
      return;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    DisplayController.updateStatus(`${players[currentPlayerIndex].name}'s turn`);
  };

  const restartGame = () => {
    Gameboard.resetBoard();
    gameOver = false;
    currentPlayerIndex = 0;
    DisplayController.render();
    DisplayController.updateStatus(`${players[currentPlayerIndex].name}'s turn`);
  };

  return { startGame, playRound, restartGame };
})();

// === Display Controller ===
const DisplayController = (() => {
  const boardContainer = document.getElementById("gameboard");
  const statusDiv = document.getElementById("status");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");

  const render = () => {
    const board = Gameboard.getBoard();
    boardContainer.innerHTML = "";
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => GameController.playRound(index));
      boardContainer.appendChild(cellDiv);
    });
  };

  const updateStatus = (message) => {
    statusDiv.textContent = message;
  };

  startBtn.addEventListener("click", () => {
    const p1 = document.getElementById("player1").value || "Player 1";
    const p2 = document.getElementById("player2").value || "Player 2";
    GameController.startGame(p1, p2);
  });

  restartBtn.addEventListener("click", () => {
    GameController.restartGame();
  });

  return { render, updateStatus };
})();
