'use strict'

let users = [];
let user = {
    "id": 1,
    "name": "Angelico Fanshaw",
    "emailAddress": "afanshaw0@wufoo.com",
    "address": "541 Eagle Crest Junction"
};

const getUsers = async (url = '') => {
    try {
        const response = await fetch(url);
        const list = await response.json();
        users = list;
        generateUserList(users);
        addDeleteListener();
    } catch(e) {
        console.log('Error: ', e);
    }
};

getUsers('http://localhost:3000/users');


const generateUserList = (users = [user]) => {
    const keys = Object.keys(users[0]);
    const tableHead = document.querySelector('thead');
    const tableHeadTr = document.createElement('tr');
    tableHead.appendChild(tableHeadTr);

    keys.forEach( (key) => {
        const tableHeadTh = document.createElement('th');
        tableHeadTh.textContent = key.toLocaleUpperCase();
        tableHeadTr.appendChild(tableHeadTh);
    });

    const tableBody = document.querySelector('tbody');

    users.forEach( user => {
        const tableBodyTr = document.createElement('tr');
        tableBody.appendChild(tableBodyTr);
        
        keys.forEach( key => {
            const tableBodyTd = document.createElement('td');
            tableBodyTd.textContent = user[key];
            tableBodyTr.appendChild(tableBodyTd); 
        });
        
        const editSaveBtn = document.createElement('button');
        editSaveBtn.className = 'btn btn-edit';
        editSaveBtn.textContent = 'Szerkesztés';
        tableBodyTr.appendChild(editSaveBtn);

        const deleteCancelBtn = document.createElement('button');
        deleteCancelBtn.className = 'btn btn-delete';
        deleteCancelBtn.textContent = 'Törlés';
        tableBodyTr.appendChild(deleteCancelBtn);
    });
};

const deleteRow = (event) => {
    let selectedRow = event.currentTarget.parentNode;
    let selectedUser = selectedRow.firstChild.textContent;
    fetch(`http://localhost:3000/users/${selectedUser}`, {
        method: 'DELETE'
      })
       .then(response => response.json())
       .then(generateUserList)
      .catch((error) => {console.error(error)})
}

const addDeleteListener = () => {
    let deleteBtns = document.querySelectorAll('button.btn-delete');
    deleteBtns.forEach(button => button.addEventListener('click', deleteRow))
}

export {
    getUsers,
    generateUserList,
}