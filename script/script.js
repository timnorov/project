'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    targetAmount = document.querySelector('.target-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodSelect = document.querySelector('.period-select');

let isNumber = function (n) { 
  return !isNaN(parseFloat(n)) && isFinite(n);
 };

incomeTitle[1].addEventListener('input',()=> {
		incomeTitle[1].value = incomeTitle[1].value.replace(/[^.,;:()"!?а-яА-ЯёЁ\s]+$/,'');
	});
expensesTitle[1].addEventListener('input',()=> {
		expensesTitle[1].value = expensesTitle[1].value.replace(/[^.,;:()"!?а-яА-ЯёЁ\s]+$/,'');
	});
additionalIncomeItem[0].addEventListener('input',()=> {
   additionalIncomeItem[0].value = additionalIncomeItem[0].value.replace(/[^.,;:()"!?а-яА-ЯёЁ\s]+$/,'');
  });
additionalIncomeItem[1].addEventListener('input',()=> {
		additionalIncomeItem[1].value = additionalIncomeItem[1].value.replace(/[^.,;:()"!?а-яА-ЯёЁ\s]+$/,'');
	});
salaryAmount.addEventListener('input',()=> {
		salaryAmount.value = salaryAmount.value.replace(/[^.,0-9]+$/,'');
	});
incomeAmount.addEventListener('input',()=> {
		incomeAmount.value = incomeAmount.value.replace(/[^.,0-9]+$/,'');
	});
expensesAmount.addEventListener('input',()=> {
		expensesAmount.value = expensesAmount.value.replace(/[^.,0-9]+$/,'');
	});
targetAmount.addEventListener('input',()=> {
		targetAmount.value = targetAmount.value.replace(/[^.,0-9]+$/,'');
	});

let appData = {
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0, 
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () { 
      appData.budget = +salaryAmount.value;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.floor(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

        let eventFunc = function(){
          incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        };
        periodSelect.addEventListener('input', eventFunc);
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
          appData.incomeMonth += +appData.income[key];
        }        
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
              appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
              appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
      for (let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];
      }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
    getTargetMonth: function() { 
        return targetAmount.value / appData.budgetMonth;
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
      calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
      }
    };

start.setAttribute("disabled", "disabled");
let inputValue = function(){
  if (salaryAmount.value == '') {
    start.setAttribute("disabled", "disabled");
  } else { 
    start.removeAttribute('disabled');
  } 
};
salaryAmount.addEventListener('input', inputValue);

start.addEventListener('click', appData.start);

let rangeValue = function(){
  let newValue = periodSelect.value;
  let target = document.querySelector('.period-amount');
  target.innerHTML = newValue;
};

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener("input", rangeValue);
