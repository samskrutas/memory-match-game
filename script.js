// Array containing pairs of card items (8 types x 2 = 16 total cards)
const cardIcons = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🍉', '🍉', '🥝', '🥝'];

let flippedCards = [];
let matchedCount = 0;
let score = 0;
let timeLeft = 45;
let timerInterval;
let isLockBoard = false;

// Initialize game loop upon page entry
setupGame();

function setupGame() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = ''; // Wipe board container elements clean
    
    // Shuffle arrays using a random sort equation mechanism
    const shuffledCards = cardIcons.sort(() => 0.5 - Math.random());

    // Generate HTML card element boxes dynamically
    shuffledCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon; // Store hidden emoji identifier properties
        card.dataset.id = index;
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert("⏰ Time is up! Game Over!");
            isLockBoard = true;
        }
    }, 1000);
}

function flipCard(card) {
    if (isLockBoard) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (flippedCards.length === 1 && flippedCards[0].dataset.id === card.dataset.id) return;

    // Reveal hidden contents visually
    card.innerText = card.dataset.icon;
    card.classList.add('flipped');
    flippedCards.push(card);

    // Evaluate matching status when two index parameters are held active
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.icon === card2.dataset.icon;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        score += 10;
        document.getElementById('score').innerText = score;
        flippedCards = [];

        // Win state declaration rule execution check
        if (matchedCount === cardIcons.length) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`🎉 Victory! You completed the game with a score of: ${score}!`), 200);
        }
    } else {
        isLockBoard = true; // Lock execution during transition timeout durations
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '';
            card2.innerText = '';
            flippedCards = [];
            isLockBoard = false; // Release interaction gates
        }, 1000);
    }
}

function resetGame() {
    flippedCards = [];
    matchedCount = 0;
    score = 0;
    timeLeft = 45;
    isLockBoard = false;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timeLeft;
    setupGame();
}
