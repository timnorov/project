'use strict';

let calculate = document.getElementById('start'),
    plus1 = document.getElementsByTagName('button')[0],
    plus2 = document.getElementsByTagName('button')[1],
    chkbox = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('additional_income-item'),
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    addIncome = document.getElementsByClassName('additional_income-value')[0],
    addExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriod = document.getElementsByClassName('income_period-value')[0],
    targetMonth = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

let isNumber = function (n) { 
  return !isNaN(parseFloat(n)) && isFinite(n);
 };

let money,
    start = function () { 
      do {
        money = prompt('Ваш месячный доход?');
      } 
      while (isNaN(money) || money === '' || money === null);
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
            do {
              itemIncome = prompt('Какой у Вас дополнительный заработок?');
            } 
            while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);
            let cashIncome; 
            do {
              cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
            } 
            while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);
            appData.income[itemIncome] = cashIncome;
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
            do {
                cashExpenses = prompt('Во сколько это обойдется?');
            } 
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);
            
            appData.expenses[itemExpenses] = cashExpenses;
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
          do {
              appData.percentDeposit = prompt('Какой годовой процент?');
            } 
            while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
          
          do {
              appData.moneyDeposit = prompt('Какая сумма заложена?');
            } 
            while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);   
        }
      },
      calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
      }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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
