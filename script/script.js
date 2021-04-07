'use strict';

let isNumber = function (n) { 
  return !isNaN(parseFloat(n)) && isFinite(n);
 };

let money,
  income = 'обучение',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  period = 12,
  budgetDay = 0,
  accumulatedMonth = 0,
  expenses1, expenses2,
  goal;

let start = function () { 
  do {
    money = prompt('Ваш месяный доход?');
  } while (!isNumber(money));
 };

start();

let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i ===0) {
      expenses1 = prompt('Введите обязательную статью расходов?');
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную статью расходов?');
    }

    do {
    sum += +prompt('Во сколько это обойдется?');
    } while (!isNumber(sum));
  }
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
  return money - expensesAmount;
};

accumulatedMonth = getAccumulatedMonth();

budgetDay = accumulatedMonth / 30;

let getTargetMonth = function(a, b) { 
  
  if ( ( a / b ) <= 0 ) {
    return 'Цель не будет достигнута';
  } else {
    return 'Цель будет достигнута за ' + Math.ceil( a / b ) + ' месяцев(-а)';
  }
};

let getStatusIncome = function () { 
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
console.log('Расходы за месяц: ' + expensesAmount);
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome());