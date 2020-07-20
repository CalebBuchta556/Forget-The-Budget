/***** BUDGET CONTROLLER *****/

// Budget data
export var budgetData = {
    inputs: {
        inc: [],
        exp: [],
        rate: 0
    },
    totals: {
        inc: 0,
        exp: 0,
        savings: 0,
        safe: 0
    }
}

// Inc and exp objects
function Income (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

function Expense (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

export function addItem (type, description, value) {
    let id, newItem;

    // if (type === 'inc') {}
    // Give the new item a unique id
    if (budgetData.inputs[type].length > 0) {
        id = (budgetData.inputs[type].length - 1) + 1;
    } else {
        id = 0;
    }

    // Determine if its an inc or exp
    if (type === 'inc') {
        newItem = new Income('inc-' + id, description, value);
    } else {
        newItem = new Expense('exp-' + id, description, value);
    }

    // Push new item to data
    budgetData.inputs[type].push(newItem);

    // Return new item
    return newItem;

}

export function deleteItem (type, id) {
    var ids, index;

    ids = budgetData.inputs[type].map(el => {
        return el.id;
    });
            
    index = ids.indexOf(id);
    
    budgetData.inputs[type].splice(index, 1); 
}

export function clearBudget (type) {
    // Delete from inputs array
    budgetData.inputs[type].splice(0, budgetData.inputs[type].length);
    
    // Set default string for local storage to prevent error
    let defaultString = '{\"inputs\":{\"inc\":[],\"exp\":[],\"rate\":0},\"totals\":{\"inc\":0,\"exp\":0,\"savings\":0,\"safe\":0}}';

    // localStorage.setItem('storedBudget', defaultString);
}

export function changeRate (rate) {
    budgetData.inputs['rate'] = rate;
}

function calculateTotal (type) {
    let sum = 0;

    sum = budgetData.inputs[type].reduce(
        (acc, cur) => {
            return acc + cur.value;
        },
        0
    );

    budgetData.totals[type] = sum;
}

export function calculateBudget () {
    let afterSavings;
            
    // calculate total income and exp
    calculateTotal('exp');
    calculateTotal('inc');
    
    // Calculate the amount of savings
    budgetData.totals['savings'] = budgetData.totals['inc'] * (budgetData.inputs['rate'] / 100);

    // Income minus savings
    afterSavings = budgetData.totals['inc'] - budgetData.totals['savings'];

    // Calculate safe to spend amount
    budgetData.totals['safe'] = afterSavings - budgetData.totals['exp'];

    // Store budget data in local storage
    localStorage.setItem('storedBudget', JSON.stringify(budgetData));
}

export function getStoredBudget () {
    // Pull string data from local storage
    let budgetString = localStorage.getItem('storedBudget');

    // Parse stored budget data string
    budgetData = JSON.parse(budgetString);
}

function getBudgetData () {
    return {
        income: budgetData.totals.inc,
        expenses: budgetData.totals.exp,
        savings: budgetData.totals.savings,
        safeToSpend: budgetData.totals.safe,
    }
}