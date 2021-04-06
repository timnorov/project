'use strict';

let money = 50000;
let income = 'обучение';
let addExpenses = 'Ипотека, Такси, ЖКХ';
let deposit = true;
let mission = 1000000;
let period = 12;
let budgetDay = money/30;
let expenses1 = null;
let expenses2 = null;
let amount1 = NaN;
let amount2 = NaN;
let budgetMonth = NaN;

addExpenses = addExpenses.toLowerCase();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.split(' '));
console.log(budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = +prompt('Во сколько это обойдется?');

budgetMonth = money - ( amount1 + amount2 );

mission = Math.ceil( mission / budgetMonth );

budgetDay = Math.floor( budgetMonth / 30 );

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + mission + ' месяцев');
console.log('Бюджет за день: ' + budgetDay);

if (budgetDay > 1200) {
  console.log('У Вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
  console.log('У Вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
  console.log('К сожалению, у Вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}