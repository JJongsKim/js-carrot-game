const CARROT_SIZE = 80;

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

const field = document.querySelector('.game__field');

// 필드의 전체적인 사이즈와 포지션을 알 수 있도록 하는 함수
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer'); 
const gameScore = document.querySelector('.game__score');

// 게임 상태를 기억하는 변수 
let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', ()=>{
    console.log('click')
    if(started){
        stopGame()
    } else{
        startGame()
    }
    started = !started
})

function stopGame(){

}

function startGame(){
    field.innerHTML=''
    gameScore.innerHTML = CARROT_COUNT;

    initGame();
    showStopButton();
    showTimerAndScore();

    startGameTimer();
}

// 게임 준비 함수-당근,벌레 추가
function initGame() {
    console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

// x1y1, x2y2값 랜덤하게 넣기
function addItem(className, count, imgPath) {
    const x1=0;
    const y1=0;
    const x2=fieldRect.width - CARROT_SIZE;
    const y2=fieldRect.height - CARROT_SIZE;

    // 아이템 배치 함수
    for (let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max-min) + min;
}

function showStopButton(){
    const icon = document.querySelector('.fas');
    icon.classList.add('.fa-stop');
    icon.classList.remove('.fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(timer)
            return
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

// 타이머 분 초 조정하기
function updateTimerText(time) {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

initGame();