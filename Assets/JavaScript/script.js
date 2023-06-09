const boxItems = document.querySelectorAll('.box-item');
const newGameButton = document.querySelector('.new-game');

let openedParagraphs = [];
let matchedParagraphs = [];

function checkWin() {
  if (openedParagraphs.length === 2) {
    const [firstParagraph, secondParagraph] = openedParagraphs;
    if (firstParagraph.textContent === secondParagraph.textContent) {
      matchedParagraphs.push(firstParagraph, secondParagraph);
      openedParagraphs = [];
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

newGameButton.addEventListener('click', () => {
  openedParagraphs = [];
  matchedParagraphs = [];

  const winMessage = document.getElementById('win-message');
  winMessage.classList.add('hidden');

  boxItems.forEach(item => {
    const paragraph = item.querySelector('p');
    paragraph.classList.add('hidden');
  });

  shuffleParagrafi();

  boxItems.forEach(item => {
    item.addEventListener('click', handleItemClick);
  });
});
