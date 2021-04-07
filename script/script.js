'use strict';
let money = +prompt('Ваш месячный доход?');
let income = 'обучение';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 12;
let budgetDay = 0;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let accumulatedMonth = 0;

const getExpensesMonth = function(a, b) {
  return a + b;
};

const getAccumulatedMonth = function(a, b, c) {
  accumulatedMonth = a - ( b + c);
};
getAccumulatedMonth(money, amount1, amount2);

budgetDay = accumulatedMonth / 30;

const getTargetMonth = function(a, b) { 
  return a / b;
};

const getStatusIncome = function () { 
  if (budgetDay > 1200) {
    return ('У Вас высокий уровень дохода');
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return ('У Вас средний уровень дохода');
  } else if (budgetDay <= 600 && budgetDay >= 0) {
    return ('К сожалению, у Вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
 };

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.toLowerCase().split(' '));
console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + ' месяцев(-а)');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome());