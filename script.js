document.addEventListener('DOMContentLoaded', () => {

    // Initialisation
    let activePlayer1 = true;
    const rollButton = document.querySelector('.roll');
    const holdButton = document.querySelector('.hold');
    const newGameButton = document.querySelector('.newGame');
    const messageElement = document.querySelector('.message');
    const scoreRound1Element = document.querySelector('.scoreRound1');
    const scoreRound2Element = document.querySelector('.scoreRound2');
    const scoreGlobal1Element = document.querySelector('.scoreGlobal1');
    const scoreGlobal2Element = document.querySelector('.scoreGlobal2');
    const active1Element = document.querySelector('.active1');
    const active2Element = document.querySelector('.active2');
    const diceElement = document.querySelector('.dice');

    rollButton.style.display = 'none';
    holdButton.style.display = 'none';
    messageElement.style.display = 'none';

    newGameButton.addEventListener('click', reset);

    function reset() {
        scoreRound1Element.textContent = '0';
        scoreRound2Element.textContent = '0';
        scoreGlobal1Element.textContent = '0';
        scoreGlobal2Element.textContent = '0';
        messageElement.textContent = "Vous avez fait 1 !";
        messageElement.style.display = 'none';
        rollButton.style.display = 'block';
        holdButton.style.display = 'block';
        choicePlayerStart();
    }

    function choicePlayerStart() {
        const number = Math.floor(Math.random() * 2);
        if (number === 1) {
            active1Element.style.color = 'red';
            active2Element.style.color = 'black';
            activePlayer1 = true;
        } else {
            active1Element.style.color = 'black';
            active2Element.style.color = 'red';
            activePlayer1 = false;
        }
    }

    function changePlayer() {
        if (activePlayer1) {
            active1Element.style.color = 'black';
            active2Element.style.color = 'red';
            activePlayer1 = false;
        } else {
            active1Element.style.color = 'red';
            active2Element.style.color = 'black';
            activePlayer1 = true;
        }
    }

    holdButton.addEventListener('click', saveScore);

    function saveScore() {
        if (activePlayer1) {
            let currentScore = parseInt(scoreRound1Element.textContent);
            let scoreGlobal = parseInt(scoreGlobal1Element.textContent);
            scoreGlobal += currentScore;
            scoreGlobal1Element.textContent = scoreGlobal;
            scoreRound1Element.textContent = '0';
            if (scoreGlobal > 99) {
                messageElement.textContent = "VICTOIRE DU JOUEUR 1";
                messageElement.style.display = 'block';
                rollButton.style.display = 'none';
                holdButton.style.display = 'none';
            }
            changePlayer();
        } else {
            let currentScore = parseInt(scoreRound2Element.textContent);
            let scoreGlobal = parseInt(scoreGlobal2Element.textContent);
            scoreGlobal += currentScore;
            scoreGlobal2Element.textContent = scoreGlobal;
            scoreRound2Element.textContent = '0';
            if (scoreGlobal > 99) {
                messageElement.textContent = "VICTOIRE DU JOUEUR 2";
                messageElement.style.display = 'block';
                rollButton.style.display = 'none';
                holdButton.style.display = 'none';
            }
            changePlayer();
        }
    }

    rollButton.addEventListener('click', rollDice);

    function diceOne() {
        rollButton.style.display = 'none';
        holdButton.style.display = 'none';
        messageElement.style.display = 'block';
        setTimeout(() => {
            rollButton.style.display = 'block';
            holdButton.style.display = 'block';
            messageElement.style.display = 'none';
        }, 2000);
    }

    function rollDice() {
        const dice = Math.floor(Math.random() * 6) + 1;
        console.log("VALEUR DU DE " + dice);
        switch (dice) {
            case 1:
                diceElement.src = "images/1.png";
                break;
            case 2:
                diceElement.src = "images/2.png";
                break;
            case 3:
                diceElement.src = "images/3.png";
                break;
            case 4:
                diceElement.src = "images/4.png";
                break;
            case 5:
                diceElement.src = "images/5.png";
                break;
            case 6:
                diceElement.src = "images/6.png";
                break;
            default:
        }
        if (activePlayer1) {
            if (dice === 1) {
                diceOne();
                changePlayer();
                scoreRound1Element.textContent = "0";
            } else {
                let currentScore = parseInt(scoreRound1Element.textContent);
                currentScore += dice;
                scoreRound1Element.textContent = currentScore;
            }
        } else {
            if (dice === 1) {
                diceOne();
                changePlayer();
                scoreRound2Element.textContent = "0";
            } else {
                let currentScore = parseInt(scoreRound2Element.textContent);
                currentScore += dice;
                scoreRound2Element.textContent = currentScore;
            }
        }
    }
});