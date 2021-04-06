'use strict';
let money = +prompt('Ваш месячный доход?'),
  income = 'обучение',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  period = 12,
  budgetDay = money/30,
  expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  budgetMonth = amount1 + amount2;

if (budgetDay > 1200) {
  console.log('У Вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
  console.log('У Вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
  console.log('К сожалению, у Вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil( mission / budgetMonth ) + ' месяцев(-а)');
console.log('Бюджет за день: ' + Math.floor(budgetDay));




