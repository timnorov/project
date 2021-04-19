'use strict';

const start = document.getElementById('start'),
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
      additionalExpenses = document.querySelector('.additional-expenses'),
      targetAmount = document.querySelector('.target-amount'),
      incomeItem = document.querySelectorAll('.income-items'),
      periodSelect = document.querySelector('.period-select');
      
let   expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item');

start.setAttribute("disabled", "disabled");
const checkInput = function() {
    const summInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    const nameInputs = document.querySelectorAll('input[placeholder="Наименование"]');

    summInputs.forEach(input => {
        input.addEventListener('input', event => {
            event.target.value = event.target.value.replace (/\D/, '');
        });
    });

    nameInputs.forEach(input => {
        input.addEventListener('input', event => {
            event.target.value = event.target.value.replace(/[a-zA-Z0-9-]/, '');
        });
    });

};

class AppData {
  constructor() {
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
  }
  check() {
      if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
      }
  }
  start() {
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

      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpInc();
      this.getBudget();
      this.showResult();
  }
  showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
       periodSelect.addEventListener('input', event => {
            event.incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        });
  }
  getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };
        console.log(expensesItems.length);
        console.log(incomeItems.length);
        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (const key in this.income) {
          this.incomeMonth += +this.income[key];
        }   
  }
  addExpIncBlock(e) {
        e = e.target.className.substring(
        e.target.className.lastIndexOf(" ") + 1, 
        e.target.className.lastIndexOf("_"));
          if (e == 'income') {
            const cloneItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneItems, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            cloneItems.querySelector('.income-title').value = '';
            cloneItems.querySelector('.income-amount').value = '';
              if(incomeItems.length === 3) {
              incomePlus.style.display = 'none';
              }
            } else {
            const cloneItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            cloneItems.querySelector('.expenses-title').value = '';
            cloneItems.querySelector('.expenses-amount').value = '';
              if(expensesItems.length === 3) {
              expensesPlus.style.display = 'none';
              }
          }  
        checkInput();
  }
  getAddExpInc() {
      const addExpenses = additionalExpensesItem.value.split(',');
      
      const count = item => {
          let startStr,
              itemValue;
          if (item.className === undefined) {
            startStr = 'addExpenses';
            itemValue = item.trim();
          } else {
            startStr = 'addIncome';
            itemValue = item.value.trim();
          }
          if (itemValue !== ''){
              itemValue = itemValue.charAt(0).toUpperCase() + itemValue.substring(1).toLowerCase();
              this[startStr].push(itemValue);
          }
      };

      addExpenses.forEach(count);
      additionalIncomeItem.forEach(count);
  }
  getExpensesMonth() {
      for (const key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
  }
  getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() { 
        return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() { 
        if (this.budgetDay > 1200) {
          return ('У Вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
          return ('У Вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
          return ('К сожалению, у Вас уровень дохода ниже среднего');
        } else {
          return ('Что-то пошло не так');
        }
  } 
  getInfoDeposit() {
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
  }
  calcPeriod() {
        return this.budgetMonth * periodSelect.value;
  }
  reset() {
        const inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
            
        inputTextData.forEach((elem) => {
          elem.value = '';
          elem.removeAttribute('disabled');
          periodSelect.value = '0';
          document.querySelector('.period-amount').innerHTML = periodSelect.value;
        });
        resultInputAll.forEach((elem) => { 
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
  }
  inputValue() {
  if (salaryAmount.value == '') {
    start.setAttribute("disabled", "disabled");
  } else { 
    start.removeAttribute('disabled');
  } 
  }
  rangeValue() {
  const newValue = periodSelect.value;
  const target = document.querySelector('.period-amount');
  target.innerHTML = newValue;
  }
  eventListeners() {
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpIncBlock);
    incomePlus.addEventListener('click', this.addExpIncBlock);
    salaryAmount.addEventListener('input', this.inputValue);
    periodSelect.addEventListener("input", this.rangeValue);
  }
}

checkInput();
const appData = new AppData();

appData.eventListeners();

