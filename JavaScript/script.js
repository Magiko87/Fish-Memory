// Seleziona gli elementi
const boxItems = document.querySelectorAll('.box-item');
const newGameButton = document.querySelector('.new-game');

// Variabile per tenere traccia dei paragrafi aperti
let openedParagraphs = [];

/// Funzione per controllare se ci sono due paragrafi uguali aperti
function checkWin() {
  if (openedParagraphs.length === 2) {
    const [firstParagraph, secondParagraph] = openedParagraphs;
    if (firstParagraph.textContent === secondParagraph.textContent) {
      const winMessage = document.querySelector('.win-message');
      winMessage.classList.remove('hidden');
    } else {
      setTimeout(() => {
        openedParagraphs.forEach(paragraph => {
          paragraph.classList.add('hidden');
        });
        openedParagraphs = [];
      }, 400);
    }
  }
}


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

// Aggiungi un gestore di eventi di clic a ciascun elemento "box-item"
boxItems.forEach(item => {
  item.addEventListener('click', () => {
    const paragraph = item.querySelector('p');
    if (openedParagraphs.includes(paragraph)) return; // Evita di aprire lo stesso paragrafo due volte
    paragraph.classList.remove('hidden');
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
  const winMessage = document.querySelector('.header p');
  if (winMessage) {
    winMessage.remove();
  }
  shuffleParagrafi();
     // Nascondi il messaggio di vittoria
  const winMessageHidden = document.querySelector('.win-message');
  winMessageHidden.classList.add('hidden');
});
