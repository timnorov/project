'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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

start.setAttribute("disabled", "disabled");
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

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0; 
    this.budgetMonth = 0; 
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};
AppData.prototype.check = function () {
      if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
      }
};
AppData.prototype.start = function () {
      if (salaryAmount === '') {
        start.setAttribute('disabled', true);
        return;
      }

      cancel.style.display = 'block';
      start.style.display = 'none';
      salaryAmount.disabled = true;
      incomeTitle[1].disabled = true;
      incomeAmount.disabled = true;
      expensesTitle[1].disabled = true;
      expensesAmount.disabled = true;
      additionalIncomeItem[0].disabled = true;
      additionalIncomeItem[1].disabled = true;
      additionalExpensesItem.disabled = true;
      targetAmount.disabled = true;
      expensesPlus.disabled = true;
      incomePlus.disabled = true;
      depositCheck.disabled = true;
      periodSelect.disabled = true;

      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
};
AppData.prototype.showResult = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
        let eventFunc = function(){
          incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        };
        periodSelect.addEventListener('input', eventFunc);
};
AppData.prototype.addExpensesBlock = function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
};
AppData.prototype.getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
};
AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
};
AppData.prototype.getIncome = function() {
        const _this = this;
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
          this.incomeMonth += +this.income[key];
        }        
};
AppData.prototype.getAddExpenses = function(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
              item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
              _this.addExpenses.push(item);
            }
        });
};
AppData.prototype.getAddIncome = function(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
              _this.addIncome.push(itemValue);
            }
        });
};
AppData.prototype.getExpensesMonth = function() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
};
AppData.prototype.getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() { 
        return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () { 
        if (this.budgetDay > 1200) {
          return ('У Вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
          return ('У Вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
          return ('К сожалению, у Вас уровень дохода ниже среднего');
        } else {
          return ('Что-то пошло не так');
        }
};
AppData.prototype.getInfoDeposit = function(){
        if(this.deposit){
          do {
              this.percentDeposit = prompt('Какой годовой процент?');
            } 
            while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
          
          do {
              this.moneyDeposit = prompt('Какая сумма заложена?');
            } 
            while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);   
        }
};
AppData.prototype.calcPeriod = function(){
        return this.budgetMonth * periodSelect.value;
};
AppData.prototype.reset = function(){
        let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
            
        inputTextData.forEach(function(elem){
          elem.value = '';
          elem.removeAttribute('disabled');
          periodSelect.value = '0';
          document.querySelector('.period-amount').innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function(elem){ 
          elem.value = '';
         });
         for (let i = 1; i < incomeItems.length; i++) {
           incomeItems[i].parentNode.removeChild(incomeItems[i]);
           incomePlus.style.display = 'block';
         }
         for (let i = 1; i < expensesItems.length; i++) {
           expensesItems[i].parentNode.removeChild(expensesItems[i]);
           expensesPlus.style.display = 'block';
         }
          this.budget = 0;
          this.budgetDay = 0; 
          this.budgetMonth = 0; 
          this.income = {};
          this.incomeMonth = 0;
          this.addIncome = [];
          this.expenses = {};
          this.addExpenses = [];
          this.expensesMonth = 0;
          this.deposit = false;
          this.percentDeposit = 0;
          this.moneyDeposit = 0;

          cancel.style.display = 'none';
          start.style.display = 'block';
          expensesPlus.removeAttribute('disabled');
          incomePlus.removeAttribute('disabled');
          periodSelect.removeAttribute('disabled');
          depositCheck.checked = false;
          depositCheck.disabled = false;
};
AppData.prototype.inputValue = function(){
  if (salaryAmount.value == '') {
    start.setAttribute("disabled", "disabled");
  } else { 
    start.removeAttribute('disabled');
  } 
};
AppData.prototype.rangeValue = function(){
  let newValue = periodSelect.value;
  let target = document.querySelector('.period-amount');
  target.innerHTML = newValue;
};
AppData.prototype.eventListeners = function (){
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('input', this.inputValue);
    periodSelect.addEventListener("input", this.rangeValue);
};

let appData = new AppData();

appData.eventListeners();