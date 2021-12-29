'use strict';


// Egy “Keresd a párját” játékot kell készítened
// A játékban két sorban soronként 5, azaz összesen 10 darab kártya látható x
// A játék kezdetekor a kártyák le vannak fordítva. A kártyák másik oldala egy egyszerű ábrát tartalmaz x
// Az ábrák szabadon választható képek vagy akár ikonok is lehetnek a könnyebb felismerhetőség végett x
// Minden ábrából összesen két darab van x
// Amikor a játékos rákattint egy kártyára, az egy egyszerű animáció kíséretében megfordul, felfedve az ábrát x
// Az első kártyára való kattintáskor elindul egy számláló, amely a játékidőt mutatja perc:másodperc formában
const cards = document.querySelectorAll(".flip-card-inner");

let hasFlippedCard = false;
let lockCards = false;
let firstCard;
let secondCard;


function flipCard() {
  if (lockCards) {return lockCards};

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    isMatch();
  }  
};

function isMatch() {
  (firstCard.dataset.card === secondCard.dataset.card) ? stopCards() : turnBackCards();
}

function stopCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  newTurn();
}

function turnBackCards() {
  lockCards = true;
  setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
     newTurn();
    }, 1400);
}

function newTurn() {
  [hasFlippedCard, lockCards] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener("click", flipCard));



// const startGame = () => {
//   addClickListener();
// };

// const addClickListener = () => {
//   cards.addEventListener("click", startTime);
// };

// function startTime() {
//     const time = new Date();
//     let m = time.getMinutes();
//     let s = time.getSeconds();
//     m = checkTime(m);
//     s = checkTime(s);
//     document.getElementById('txt').innerHTML = `${m}:${s}`;
//     setTimeout(startTime, 1000);
//   }

//   function checkTime(i) {
//     if (i < 10) {i = "0" + i};  
//     return i;
//   }
// Amennyiben egymás után két felfordított kártyán ugyanaz az ábra szerepel, azokat felfordítva kell hagyni a játék végéig, 
// többet nem lehet rájuk kattintani x
// Amennyiben a két ábra eltérő, mind a kettőt automatikusan vissza kell forgatni x
// A játéknak akkor van vége, amikor az összes kártya képes oldala látszik x
// A számláló a játék végén megáll
// 5 másodperc múlva a számláló nullázódik, és az összes kártya visszafordul, kezdődhet egy új játék
