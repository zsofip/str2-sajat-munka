'use strict';

let matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = 'X';

const initState = () => {
    matrix = Array(cols).fill(null).map(() => Array(rows).fill(null));
};

const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
};

const deleteSigns = () => {
    let cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach(item => item.textContent = " ");
};

const increaseCounter = () => {
        stepCount += 1;
};

const modifyCell = (element) => {
    element.textContent = mark;
    element.removeEventListener("click", handleClick);
};

const setMark = () => {
    if (mark === 'X') {
        mark = 'O';
    } else {
        mark = 'X';
    }   
};

const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner();
};

const addClickListener = () => {
    let cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach(item => item.addEventListener("click", handleClick));
};


const removeAllClickListeners = () => {
    let cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach(item => item.removeEventListener("click", handleClick));
};

const checkValues = (array) => array.map(row => {
    return row.every(item => item == 'O')  ||  row.every(item => item == 'X');  
}).indexOf(true) !== -1;

    const checkColumnValues = () => 
        checkValues(matrix.map((array, i) => 
        array.map((item, j) => matrix[j][i])));

    const checkDiagonalValues = () =>
        checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])
]);

const checkWinner = () => {
    console.log(checkColumnValues()); 
    console.log(checkDiagonalValues());
   if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues()) {
       endGame();
   }
};

const setMessage = (message) => {
    document.querySelector(".message").textContent = message;
};

const startGame = () => {
    initState();
    addClickListener();
    newGame();
};

const endGame = () => {
    setMessage('The winner is Player ' + (mark === 'X' ? 'O' : 'X') + '.');
    removeAllClickListeners();
};

const newGame = () => {
   const btn = document.querySelector("button")
   btn.addEventListener("click", function() {
    initState(); 
    addClickListener(); 
    deleteSigns(); 
    setMessage("Playing..."); 
    setMark();
    });
};   

startGame();
