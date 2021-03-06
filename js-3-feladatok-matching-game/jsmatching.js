'use strict';

const cards = document.querySelectorAll(".flip-card");
const cardsInner = document.querySelectorAll(".flip-card-inner");

let hasFlippedCard = false;
let lockCards = false;
let firstCard;
let secondCard;
let matchedCards = [];

const timer = document.querySelector("#timer");
let time;
let min = 0;
let sec = 0;
let timeStart = false;

function startTime() {
  time = setInterval(function() {
    sec++;
    if (sec === 60) {
    min++;
    sec = 0;
    } 
    sec = checkTime(sec);
    timer.innerHTML = `${min}:${sec}`;
    }, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  
  return i;
}

function flipCard() {
  if (timeStart === false) {
    timeStart = true; 
    startTime();
  };
  if (lockCards) {return lockCards};
  if (this === firstCard) {return firstCard};

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return firstCard;
  } else {
    secondCard = this;
    lockCards = true;
    isMatch();
  } 
};

function isMatch() {
  (firstCard.dataset.card === secondCard.dataset.card) ? stopCards() : turnBackCards();
}

function stopCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedCards.push(firstCard, secondCard);
  newTurn();
}

function turnBackCards() {
  lockCards = true;
  setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
     newTurn();
    }, 1500);
}

function newTurn() {
  [hasFlippedCard, lockCards] = [false, false];
  [firstCard, secondCard] = [null, null];
  if (matchedCards.length === 10) {
    stopTime();
  }
}

function stopTime() {
  clearInterval(time);
  setTimeout(resetGame, 5000);
}

function shuffleCards() {
  cards.forEach(item => {
    let randomOrder = Math.floor(Math.random() * 10);
    item.style.order = randomOrder;
  });
}

function resetGame() {
  timeStart = false;
  sec = 0;
  min = 0;
  timer.innerHTML = "00:00";
  cardsInner.forEach(card => card.classList.remove("flip"));
  matchedCards = [];
  startGame();
}

function startGame() {
  cardsInner.forEach(card => card.addEventListener("click", flipCard));
  shuffleCards();
}

startGame();

// Egy ???Keresd a p??rj??t??? j??t??kot kell k??sz??tened
// A j??t??kban k??t sorban soronk??nt 5, azaz ??sszesen 10 darab k??rtya l??that?? x
// A j??t??k kezdetekor a k??rty??k le vannak ford??tva. A k??rty??k m??sik oldala egy egyszer?? ??br??t tartalmaz x
// Az ??br??k szabadon v??laszthat?? k??pek vagy ak??r ikonok is lehetnek a k??nnyebb felismerhet??s??g v??gett x
// Minden ??br??b??l ??sszesen k??t darab van x
// Amikor a j??t??kos r??kattint egy k??rty??ra, az egy egyszer?? anim??ci?? k??s??ret??ben megfordul, felfedve az ??br??t x
// Az els?? k??rty??ra val?? kattint??skor elindul egy sz??ml??l??, amely a j??t??kid??t mutatja perc:m??sodperc form??ban x
// Amennyiben egym??s ut??n k??t felford??tott k??rty??n ugyanaz az ??bra szerepel, azokat felford??tva kell hagyni a j??t??k v??g??ig, 
// t??bbet nem lehet r??juk kattintani x
// Amennyiben a k??t ??bra elt??r??, mind a kett??t automatikusan vissza kell forgatni x
// A j??t??knak akkor van v??ge, amikor az ??sszes k??rtya k??pes oldala l??tszik x
// A sz??ml??l?? a j??t??k v??g??n meg??ll x
// 5 m??sodperc m??lva a sz??ml??l?? null??z??dik, x
// ??s az ??sszes k??rtya visszafordul, x
// kezd??dhet egy ??j j??t??k x
