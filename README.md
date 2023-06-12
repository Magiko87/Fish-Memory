# Gioco della Memoria

Questo è un semplice gioco della memoria implementato in JavaScript.

## Come giocare

- Fai clic sulle carte per svelare i paragrafi nascosti.
- Cerca di trovare i paragrafi abbinati.
- Se due paragrafi corrispondono, rimarranno visibili.
- Se due paragrafi non corrispondono, verranno nascosti di nuovo.
- Abbina tutti i paragrafi per vincere il gioco.
- Il gioco ha un timer di conto alla rovescia. Se il timer raggiunge lo zero, il gioco finisce.
- Il tuo punteggio verrà visualizzato in base al numero di abbinamenti effettuati.

## Tecnologie utilizzate

- HTML
- CSS
- JavaScript

## Come iniziare

Per giocare al gioco, apri semplicemente il file `index.html` nel tuo browser web.

## Logica di gioco

Il codice JavaScript gestisce la logica del gioco. Ecco alcune funzioni principali:

- `checkWin()`: Controlla se il giocatore ha vinto il gioco abbinando tutti i paragrafi.
- `updateScore()`: Aggiorna il punteggio visualizzato sullo schermo.
- `shuffleArray()`: Mescola un array per randomizzare l'ordine dei paragrafi.
- `startTimer()`: Avvia il timer di conto alla rovescia.
- `stopTimer()`: Ferma il timer di conto alla rovescia.
- `blockGame()`: Disabilita gli eventi di clic sulle carte e ferma il timer.
- `showMessage()`: Mostra un messaggio di vittoria o sconfitta con il punteggio finale.
- `handleItemClick()`: Gestisce l'evento di clic sulle carte e controlla gli abbinamenti.

## Licenza

Questo progetto è concesso in licenza secondo i termini della [Licenza MIT](LICENSE).

## Autore

Daniele Camodeca
