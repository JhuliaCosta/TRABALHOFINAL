const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];
const duplicatedColors = [...colors, ...colors]; // 8 pares
let shuffledColors = duplicatedColors.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
  shuffledColors.forEach(color => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color;
    gameBoard.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("revealed") || card === firstCard) return;

      revealCard(card);

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        checkMatch();
      }
    });
  });
}

function revealCard(card) {
  card.style.backgroundColor = card.dataset.color;
  card.classList.add("revealed");
}

function hideCard(card) {
  card.style.backgroundColor = "gray";
  card.classList.remove("revealed");
}

function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.color === secondCard.dataset.color) {
    resetTurn();
  } else {
    setTimeout(() => {
      hideCard(firstCard);
      hideCard(secondCard);
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
