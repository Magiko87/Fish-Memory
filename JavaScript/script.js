// Seleziona gli elementi
const boxItems = document.querySelectorAll('.box-item');
const newGameButton = document.querySelector('.new-game');

// Variabile per tenere traccia dei paragrafi aperti
let openedParagraphs = [];
let gameLocked = false;

// Funzione per mescolare casualmente un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funzione per mescolare i paragrafi
function shuffleParagrafi() {
  const shuffledParagrafi = shuffleArray(Array.from(boxItems));
  const parent = boxItems[0].parentNode;
  parent.innerHTML = '';
  shuffledParagrafi.forEach(item => {
    parent.appendChild(item);
  });
}

// Funzione per controllare se ci sono due paragrafi uguali aperti
function checkWin() {
  if (openedParagraphs.length === 2) {
    const [firstParagraph, secondParagraph] = openedParagraphs;
    if (firstParagraph.textContent === secondParagraph.textContent) {
      // Hai vinto!
      const winMessage = document.createElement('p');
      winMessage.textContent = 'Hai vinto!';
      document.body.appendChild(winMessage);
      gameLocked = true;
    } else {
      // Blocca il gioco per un breve periodo e chiudi i paragrafi
      gameLocked = true;
      setTimeout(() => {
        openedParagraphs.forEach(paragraph => {
          paragraph.classList.add('hidden');
        });
        openedParagraphs = [];
        gameLocked = false;
      }, 1000);
    }
  }
}

// Aggiungi un gestore di eventi di clic a ciascun elemento "box-item"
boxItems.forEach(item => {
  item.addEventListener('click', () => {
    if (gameLocked) return;
    const paragraph = item.querySelector('p');
    if (paragraph.classList.contains('hidden')) return;
    paragraph.classList.toggle('hidden');
    openedParagraphs.push(paragraph);
    checkWin();
  });
});

// Aggiungi un gestore di eventi di clic al pulsante "new-game"
newGameButton.addEventListener('click', () => {
  boxItems.forEach(item => {
    const paragraph = item.querySelector('p');
    paragraph.classList.add('hidden');
  });
  openedParagraphs = [];
  gameLocked = false;
  shuffleParagrafi();
});
