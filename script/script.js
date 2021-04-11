'use strict';

let isNumber = function (n) { 
  return !isNaN(parseFloat(n)) && isFinite(n);
 };

let money,
    accumulatedMonth = 0,
    expensesAmount;

let start = function () { 
  do {
    money = prompt('Ваш месяный доход?');
  } while (!isNumber(money));
 };

start();
let appData = {
    budget: money,
    income: {},
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 3,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0,
    asking: function () { 
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(' ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            appData.expenses = function() {
                for (let i = 0; i < 2; i++) {
                  if ( i === 0 ) {
                  let expenses1 = prompt('Введите обязательную статью расходов?');
                  do {
                    appData.expenses[expenses1] = +prompt('Во сколько это обойдется?');
                  } while (!isNumber(appData.expenses[expenses1]));
                  } else if (i === 1) {
                  let expenses2 = prompt('Введите обязательную статью расходов?');
                  do {
                    appData.expenses[expenses2] = +prompt('Во сколько это обойдется?');
                  } while (!isNumber(appData.expenses[expenses2]));
                }
              }
            };
    },
    getExpensesMonth: function() {
      let res = 0;
      for (let key in appData.expenses) {
        res += appData.expenses[key];
      }
      appData.expensesMonth = res;
      return res;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return appData.budgetMonth;
      },
    getTargetMonth: function(a, b) { 
        if ( ( a / b ) <= 0 ) {
          return 'Цель не будет достигнута';
        } else {
          return 'Цель будет достигнута за ' + Math.ceil( a / b ) + ' месяцев(-а)';
        }
      },
    getStatusIncome: function () { 
        if (appData.budgetDay > 1200) {
          return ('У Вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
          return ('У Вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
          return ('К сожалению, у Вас уровень дохода ниже среднего');
        } else {
          return ('Что-то пошло не так');
        }
      },
    };

appData.asking();
appData.expenses();
console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log(appData.getTargetMonth(appData.mission, appData.getBudget()));
console.log('Уровень дохода: ' + appData.budget);
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key+': ' + appData[key]);
}