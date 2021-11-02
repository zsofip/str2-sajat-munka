/* Egy modalt, azaz felugró ablakot kell készítened.
A modal főbb részei: 

bezárás gomb
fejléc
tartalmi rész
lábléc (alsó gombok jobbra igazítva)
A modal szélessége alaphelyzetben 100%, 560 pixel felett 50%
A modalt nem dinamikusan JavaScriptből kell létrehozni, hanem már eleve a DOM része lehet!

Működés:

A modalt bármilyen gomb vagy egyéb elem eseményéhez hozzá lehessen rendelni, tehát pl.: ha rákattintok egy gombra, akkor jelenik meg
A modal mind vertikálisan, mind horizontálisan középre kell legyen pozicionálva
Amikor a modal megnyílik, a hátteret egy részben áttetsző réteggel le kell takarni, a modalt focus-ba kell helyezni
A modal egy egyszerű animáció kíséretében jelenjen meg (pl.: fade)
A modal egy egyszerű animáció kíséretében tűnjön el bezáráskor
A modalon kívülre kattintva is automatikusan záródjon be a modal, tűnjön el az overlay réteg
*/

const modal = document.querySelector(".modal");
const modalOpenbtn = document.querySelector(".modalOpenbtn");
const modalContent = document.querySelector(".modalContent");
const modalOKbtn = document.querySelector("#OKbtn");
const modalcancelbtn = document.querySelector("#cancelbtn");

modalOpenbtn.addEventListener("click", function(event) {
    modal.style.display = "block";
})

modalOpenbtn.addEventListener("click", function(event) {
    modalContent.focus();
})

modalOKbtn.addEventListener("click", function(event) {
    modal.style.display = "none";
})

modalcancelbtn.addEventListener("click", function(event) {
    modal.style.display = "none";
})

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
      }
})
