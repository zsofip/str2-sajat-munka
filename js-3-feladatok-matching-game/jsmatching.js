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

// Egy “Keresd a párját” játékot kell készítened
// A játékban két sorban soronként 5, azaz összesen 10 darab kártya látható x
// A játék kezdetekor a kártyák le vannak fordítva. A kártyák másik oldala egy egyszerű ábrát tartalmaz x
// Az ábrák szabadon választható képek vagy akár ikonok is lehetnek a könnyebb felismerhetőség végett x
// Minden ábrából összesen két darab van x
// Amikor a játékos rákattint egy kártyára, az egy egyszerű animáció kíséretében megfordul, felfedve az ábrát x
// Az első kártyára való kattintáskor elindul egy számláló, amely a játékidőt mutatja perc:másodperc formában x
// Amennyiben egymás után két felfordított kártyán ugyanaz az ábra szerepel, azokat felfordítva kell hagyni a játék végéig, 
// többet nem lehet rájuk kattintani x
// Amennyiben a két ábra eltérő, mind a kettőt automatikusan vissza kell forgatni x
// A játéknak akkor van vége, amikor az összes kártya képes oldala látszik x
// A számláló a játék végén megáll x
// 5 másodperc múlva a számláló nullázódik, x
// és az összes kártya visszafordul, x
// kezdődhet egy új játék x
