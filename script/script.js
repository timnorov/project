let money = 50000;
let income = 'обучение';
let addExpenses = 'Ипотека, Такси, ЖКХ';
let deposit = true;
let mission = 1000000;
let period = 12;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(' '));

let budgetDay = money/30;
console.log(budgetDay);