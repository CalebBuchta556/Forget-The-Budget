/***** UI CONTROLLER *****/
import * as BudgetControl from './budget.js';

export var DOMStrings = {
    safeToSpendText: '.safe-txt',

    inputSavingsRate: '.rate-number',
    changeRateBtn: '.change-rate',

    incomeText: '.inc-txt',
    expenseText: '.exp-txt',
    rateText: '.rate-txt',
    savingsText: '.savings-txt',

    incomeContainer: '.inc-container',
    expenseContainer: '.exp-container',

    inputIncDescription: '.inc-description',
    inputIncValue: '.inc-amount',
    inputIncBtn: '.add-inc-btn',
    incList: '.inc-list',
    clearIncList: '.clear-inc-list',
    listIncLabel: '.inc-des-label',
    listIncValueLabel: '.inc-amt-label',

    inputExpDescription: '.exp-description',
    inputExpValue: '.exp-amount',
    inputExpBtn: '.add-exp-btn',
    expList: '.exp-list',
    clearExpList: '.clear-exp-list',
    listExpLabel: '.exp-des-label',
    listExpValueLabel: '.exp-amt-label'
}

// Get inc inputs
export function getIncInput () {
    return {
        description: document.querySelector(DOMStrings.inputIncDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputIncValue).value)
    }
}

// Get exp inputs
export function getExpInput () {
    return {
        description: document.querySelector(DOMStrings.inputExpDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputExpValue).value)
    }
}

export function getSavingsInput () {
    let newRate;
    
    newRate = parseFloat(document.querySelector(DOMStrings.inputSavingsRate).value)

    return newRate;
}


// Add inc item to list
export function addIncItem (incItem) {

    var html, newHtml;

    // Create html template
    html = `<li id="%inc-id%" class="inc-container"><h3 class="inc-des-label">%inc-description%</h3><p class="inc-amt-label">$%inc-value%</p><button class="trash-btn"><ion-icon name="trash-outline"></ion-icon></button></li>`;

    // Replace placeholder text with data
    newHtml = html.replace('%inc-id%', incItem.id);
    newHtml = newHtml.replace('%inc-description%', incItem.description);
    newHtml = newHtml.replace('%inc-value%', incItem.value);

    // Insert html into the DOM
    document.querySelector(DOMStrings.incList).insertAdjacentHTML('beforeend', newHtml);
}

// Add inc item to list
export function addExpItem (expItem) {

    var html, newHtml;

    // Create html template
    html = `<li id="%exp-id%" class="exp-container"><h3 class="exp-des-label">%exp-description%</h3><p class="exp-amt-label">$%exp-value%</p><button class="trash-btn"><ion-icon name="trash-outline"></ion-icon></button></li>`;

    // Replace placeholder text with data
    newHtml = html.replace('%exp-id%', expItem.id);
    newHtml = newHtml.replace('%exp-description%', expItem.description);
    newHtml = newHtml.replace('%exp-value%', expItem.value);

    // Insert html into the DOM
    document.querySelector(DOMStrings.expList).insertAdjacentHTML('beforeend', newHtml);
}

// Delete item from list
export function deleteListItem (selectorID) {
    let element;

    element = document.getElementById(selectorID);
    element.parentNode.removeChild(element);
}

// Clear all items from list
export function clearList (type) {
    let ids;

    ids = BudgetControl.budgetData.inputs[type].map(cur => {
        return cur.id;
    });

    ids.forEach(cur => {
        deleteListItem(cur);
    });
}

export function updateOverview () {

    document.querySelector(DOMStrings.incomeText).textContent = `$${BudgetControl.budgetData.totals['inc'].toString()}`

    document.querySelector(DOMStrings.expenseText).textContent = `$${BudgetControl.budgetData.totals['exp'].toString()}`

    document.querySelector(DOMStrings.savingsText).textContent = `$${BudgetControl.budgetData.totals['savings'].toString()}`

    document.querySelector(DOMStrings.safeToSpendText).textContent = `$${BudgetControl.budgetData.totals['safe'].toString()}`

    document.querySelector(DOMStrings.rateText).textContent = `${BudgetControl.budgetData.inputs['rate'].toString()}%`

}