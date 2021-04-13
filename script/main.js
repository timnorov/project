'use strict';

const books = document.querySelector('.books'),
      elems = document.querySelectorAll('.book');

books.prepend(elems[1]);
books.append(elems[2]);
elems[4].after(elems[3]);
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";
elems[4].childNodes[1].innerHTML = '<a>Книга 3. this и Прототипы Объектов</a>';
document.querySelector('.adv').remove();
elems[0].childNodes[3].classList.add('book2');
elems[5].childNodes[3].classList.add('book5');
elems[2].childNodes[3].classList.add('book6');

let book2 = document.querySelector('.book2');
let book5 = document.querySelector('.book5');
let book6 = document.querySelector('.book6');

book2.children[3].after(book2.children[6]);
book2.children[4].after(book2.children[8]);
book2.children[9].after(book2.children[2]);

book5.children[1].after(book5.children[9]);
book5.children[9].after(book5.children[3]);
book5.children[4].after(book5.children[9]);
book5.children[8].after(book5.children[6]);

const elemClone = book6.children[9].cloneNode();

book6.append(elemClone);
book6.children[10].innerHTML = 'Глава 8: За пределами ES6';
book6.children[10].after(book6.children[9]);
