'use strict';
let money = +prompt('Ваш месячный доход?'),
  income = 'обучение',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  period = 12,
  budgetDay = 0,
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  accumulatedMonth = 0;

let getExpensesMonth = function(a, b) {
  return a + b;
};

let getAccumulatedMonth = function(a, b, c) {
  accumulatedMonth = a - ( b + c);
};
getAccumulatedMonth(money, amount1, amount2);

budgetDay = accumulatedMonth / 30;

let getTargetMonth = function(a, b) { 
  return a / b;
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
console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + ' месяцев(-а)');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome());