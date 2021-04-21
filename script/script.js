'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositPercent = document.querySelector('.deposit-percent'),
      depositAmount = document.querySelector('.deposit-amount'),
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
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      newData = {};

start.setAttribute("disabled", "disabled");
const checkInput = function() {
    const summInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    const percentInput = document.querySelectorAll('input[placeholder="Процент"]');
    const nameInputs = document.querySelectorAll('input[placeholder="Наименование"]');

    percentInput.forEach(input => {
        input.addEventListener('input', event => {
            event.target.value = event.target.value.replace (/\D/, '');
            if (depositPercent.value > 100 || depositPercent.value < 1) {
              alert('Введите корректный процент');
              depositPercent.value = '';
            start.setAttribute("disabled", "disabled");
            } else {
            start.removeAttribute("disabled");
        }
        });
    });

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
      depositAmount.disabled = true;
      depositBank.disabled = true;
      depositPercent.disabled = true;

      this.budget = +salaryAmount.value;

      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpInc();
      this.getInfoDeposit(); 
      this.getBudget();
      this.showResult();

      
      localStorage.budgetMonth = budgetMonthValue.value;
      localStorage.budgetDay = budgetDayValue.value;
      localStorage.expensesMonth = expensesMonthValue.value;
      localStorage.addIncome = additionalIncomeValue.value;
      localStorage.addExpenses = additionalExpensesValue.value;
      localStorage.targetMonth = targetMonthValue.value;
      localStorage.incomePeriod = incomePeriodValue.value;
      
      document.cookie = 'budgetMonth=budgetMonthValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'budgetDay=budgetDayValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'expensesMonth=expensesMonthValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'addIncome=additionalIncomeValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'addExpenses=additionalExpensesValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'targetMonth=targetMonthValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'incomePeriod=incomePeriodValue.value; expires=Tue, May 2024 00:00:00 GMT';
      document.cookie = 'isLoad=true; expires=Tue, May 2024 00:00:00 GMT';
      
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() { 
        return targetAmount.value / this.budgetMonth;
  }
  getInfoDeposit() {
        if(this.deposit){
          this.percentDeposit = depositPercent.value;
          this.moneyDeposit = depositAmount.value;  
        }
  }
  changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
          depositPercent.style.display = 'inline-block';
          this.percentDeposit = depositPercent.value;
          depositPercent.value = '';
        } else {
          depositPercent.style.display = 'none';
          depositPercent.value = valueSelect;
        }
        
  }
  depositHandler() {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositPercent.style.display = 'none';
        depositBank.removeEventListener('change', this.changePercent);
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
          depositBank.removeAttribute('disabled');
          depositBank.style.display = 'none';
          depositAmount.style.display = 'none';
          depositPercent.style.display = 'none';
          depositBank.value = '';
          depositAmount.value = '';
          depositCheck.disabled = false;
          depositCheck.checked = false;

          localStorage.removeItem('addExpenses');
          localStorage.removeItem('addIncome');
          localStorage.removeItem('budgetDay');
          localStorage.removeItem('budgetMonth');
          localStorage.removeItem('incomePeriod');
          localStorage.removeItem('targetMonth');
          localStorage.removeItem('expensesMonth');

          document.cookie = 'budgetMonth=budgetMonthValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'budgetDay=budgetDayValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'expensesMonth=expensesMonthValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'addIncome=additionalIncomeValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'addExpenses=additionalExpensesValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'targetMonth=targetMonthValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'incomePeriod=incomePeriodValue.value; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie = 'isLoad=true; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
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
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

checkInput();
const appData = new AppData();

appData.eventListeners();

const showText = function () { 
      budgetMonthValue.value = localStorage.budgetMonth;
      budgetDayValue.value = localStorage.budgetDay;
      expensesMonthValue.value = localStorage.expensesMonth;
      additionalIncomeValue.value = localStorage.addIncome;
      additionalExpensesValue.value = localStorage.addExpenses;
      targetMonthValue.value = localStorage.targetMonth;
      incomePeriodValue.value = localStorage.incomePeriod;
 };

 showText();

 if (localStorage.getItem('budgetMonth') !== null) {
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
      depositAmount.disabled = true;
      depositBank.disabled = true;
      depositPercent.disabled = true;
 }

let count = 0;
let keyValuePairs = document.cookie.split(';');
let trimedArr = keyValuePairs.map(str => str.trim());
for(var i in localStorage) {
  for(var x = 0; x < trimedArr.length; x++) {
  let name = trimedArr[x].substring(0, trimedArr[x].indexOf('='));
  name.trim();
    if (i == name) {
    count++;
  }
  }
}
  if (count < localStorage.length) {
    AppData.prototype.reset();
  }