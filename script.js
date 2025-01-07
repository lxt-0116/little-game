// 获取所有卡片
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// 翻转卡片
function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // 第一次点击
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // 第二次点击
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

// 检查卡片是否匹配
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // 匹配成功
        disableCards();
    } else {
        // 匹配失败
        unflipCards();
    }
}

// 匹配成功，禁用卡片
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// 匹配失败，翻转回背面
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// 重置游戏板
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// 随机排列卡片
function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

// 初始化游戏
function initGame() {
    shuffleCards();
    cards.forEach(card => card.addEventListener('click', flipCard));
}

// 启动游戏
initGame();