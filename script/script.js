'use strict';

let isNumber = function (n) { 
  return !isNaN(parseFloat(n)) && isFinite(n);
 };

let money,
    start = function () { 
      let n = 0;
      do {
        n = prompt('Ваш месяный доход?');
      } 
      while (n.trim().length == 0 || !isNumber(n));
      money = +n;
    };

start();

let appData = {
    budget: money,
    budgetDay: 0, 
    budgetMonth: 0, 
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 3,
    asking: function () { 

        if(confirm('Есть ли у Вас дополнительный заработок?')) {
            let itemIncome;
            let n = 0;
            do {
              n = prompt('Какой у Вас дополнительный заработок?');
            } 
            while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);
            let cashIncome;
            n = 0; 
            do {
              n = prompt('Сколько в месяц Вы на этом зарабатываете?');
            } 
            while (n.trim().length == 0 || !isNumber(n));
            appData.income[itemIncome] = +n;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(' ');
        appData.addExpenses = appData.addExpenses.map(w => w.charAt(0).toUpperCase() + w.slice(1));
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
      
            let itemExpenses;
            do {
              itemExpenses = prompt('Введите обязательную статью расходов?');
            } 
            while (!isNaN(itemExpenses) || itemExpenses === '' || itemExpenses === null);

            let cashExpenses;
            let n = 0;
            do {
                n = prompt('Во сколько это обойдется?');
            } 
            while (n.trim().length == 0 || !isNumber(n));
            
            appData.expenses[itemExpenses] = +n;
        }
    },
    getExpensesMonth: function() {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
    getTargetMonth: function() { 
        return appData.mission / appData.budgetMonth;
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
      getInfoDeposit: function(){
        if(appData.deposit){
          let n = 0;
          do {
              n = prompt('Какой годовой процент?');
            } 
            while (n.trim().length == 0 || !isNumber(n));
            appData.percentDeposit = +n;
          do {
              n = prompt('Какая сумма заложена?');
            } 
            while (n.trim().length == 0 || !isNumber(n));
            appData.moneyDeposit = +n;
        } 
      },
      calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
      }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + 'месяца(ев)');
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

console.log('Возможные расходны: ' + appData.addExpenses.join(' '));