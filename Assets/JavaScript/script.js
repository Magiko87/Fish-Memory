const boxItems = document.querySelectorAll('.box-item');
const newGameButton = document.querySelector('.new-game');

let countdown = parseInt(document.querySelector("#timer").getAttribute('data-time'));
let score = 0; // Punteggio iniziale
let timerInterval; // Riferimento all'intervallo del timer

let openedParagraphs = [];
let matchedParagraphs = [];

function checkWin() {
  if (openedParagraphs.length === 2) {
    const [firstParagraph, secondParagraph] = openedParagraphs;
    if (firstParagraph.textContent === secondParagraph.textContent) {
      matchedParagraphs.push(firstParagraph, secondParagraph);
      openedParagraphs = [];

      // Incrementa il punteggio di 10
      score += 10;
      updateScore();
    } else {
      setTimeout(() => {
        openedParagraphs.forEach(paragraph => {
          paragraph.classList.add('hidden');
        });
        openedParagraphs = [];
      }, 400);
    }
  }

  if (matchedParagraphs.length === boxItems.length) {
    // Hai vinto!
    const winMessage = document.getElementById('win-message');
    winMessage.classList.remove('hidden');
    boxItems.forEach(item => {
      item.removeEventListener('click', handleItemClick);
    });
  }
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Punteggio: ${score}`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  countdown = parseInt(timerElement.getAttribute('data-time'));

  timerInterval = setInterval(() => {
    countdown--;

    // Aggiorna il display del timer
    const minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
    const seconds = (countdown % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (countdown <= 0) {
      // Il tempo è scaduto, blocca il gioco e mostra il messaggio
      clearInterval(timerInterval);
      blockGame();
      showMessage('Lose!!');
      timerElement.textContent = '00:00'; // Imposta il timer a 00:00
    }
  }, 1000);
}
function checkWin() {
  if (openedParagraphs.length === 2) {
    const [firstParagraph, secondParagraph] = openedParagraphs;
    if (firstParagraph.textContent === secondParagraph.textContent) {
      matchedParagraphs.push(firstParagraph, secondParagraph);
      openedParagraphs = [];
      score += 10; // Incrementa il punteggio di 10 punti
    } else {
      setTimeout(() => {
        openedParagraphs.forEach(paragraph => {
          paragraph.classList.add('hidden');
        });
        openedParagraphs = [];
      }, 400);
    }
  }

  if (matchedParagraphs.length === boxItems.length) {
    // Hai vinto!
    const winMessage = document.getElementById('win-message');
    winMessage.classList.remove('hidden');
    boxItems.forEach(item => {
      item.removeEventListener('click', handleItemClick);
    });
  }
}


function stopTimer() {
  clearInterval(timerInterval);
}

newGameButton.addEventListener('click', () => {
  openedParagraphs = [];
  matchedParagraphs = [];

  const winMessage = document.getElementById('win-message');
  winMessage.classList.add('hidden');
  const loseMessage = document.getElementById('lose-message');
  loseMessage.classList.add('hidden'); 


  boxItems.forEach(item => {
    const paragraph = item.querySelector('p');
    paragraph.classList.add('hidden');
  });

  shuffleParagrafi();

  boxItems.forEach(item => {
    item.addEventListener('click', handleItemClick);
  });

  // Avvia il timer
  stopTimer();
  startTimer();
});

function blockGame() {
  boxItems.forEach(item => {
    item.removeEventListener('click', handleItemClick);
  });

  stopTimer();
}
  // Reimposta il timer
  countdown = parseInt(document.querySelector("#timer").getAttribute('data-time'));
  stopTimer();
  startTimer();


function showMessage(message) {
  const loseMessage = document.getElementById('lose-message');
  loseMessage.textContent = `${message} Score: ${score}`;
  loseMessage.classList.remove('hidden');
}


function shuffleParagrafi() {
  const shuffledParagrafi = shuffleArray(Array.from(boxItems));
  const parent = boxItems[0].parentNode;
  parent.innerHTML = '';
  shuffledParagrafi.forEach(item => {
    parent.appendChild(item);
  });
}

function handleItemClick() {
  const paragraph = this.querySelector('p');
  if (openedParagraphs.includes(paragraph)) return;
  paragraph.classList.remove('hidden');
  openedParagraphs.push(paragraph);
  checkWin();

  if (openedParagraphs.length === 2) {
    setTimeout(() => {
      openedParagraphs.forEach(paragraph => {
        paragraph.classList.add('hidden');
      });
      openedParagraphs = [];
    }, 450);
  }
}

boxItems.forEach(item => {
  item.addEventListener('click', handleItemClick);
});

// Avvia il timer all'avvio del gioco
startTimer();
