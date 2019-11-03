import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
// ADD_EXPENCE
const addExpense = (
    {
        des = '',
        note = '',
        createdAt = 0,
        amount = 0
    } = {}
) => ({
    type: 'ADD_EXPENCE',
    expense: {
        id: uuid(),
        des,
        note,
        createdAt,
        amount
    }
});

// REMOVE_EXPENSE
const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
})

//SET_TEXT_FILTER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})
//SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

// Expenses Reducers
const expensesReducersDefaultState = [];
const expensesReducers = (state = expensesReducersDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENCE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => action.id !== id)
        case 'EDIT_EXPENSE':
            return state.map((i) => i.id === action.id ? {...i, ...action.update} : {...i});
        default: 
            return state
    }
}

// filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy: 'amount'}
        case 'SORT_BY_DATE':
            return {...state, sortBy: 'date'}
        case 'SET_END_DATE':
            return {...state, endDate: action.date}
        case 'SET_START_DATE':
            return {...state, startDate: action.date}
        default:
            return state
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}={}) => {
    return expenses.filter((e) => {
        const startDateMatch = typeof startDate !== 'number' || e.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || e.createdAt <= endDate;
        const textMatch = e.des.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

    }).sort((a, b) => {
        if(sortBy==='date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

// store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducers,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const e1 = store.dispatch(addExpense({des: 'jan Rent', amount: 1000, createdAt: 1000}));
const e2 = store.dispatch(addExpense({des: 'Coffe..', amount: 500, createdAt: 2000}));

// store.dispatch(removeExpense(e1.expense.id));
// store.dispatch(editExpense(e2.expense.id, { amount: 1000}));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(250));

// const demoState = {
//     expenses: [{
//         id: '0',
//         des: 'jan rent',
//         note: 'this is my final payment',
//         amount: 1000,
//         createdAt: 0
//     }],
//     filters: {
//         text: 'rent',
//         sortBy: 'amout', // date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// }
