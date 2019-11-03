// import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
// ADD_EXPENCE
export const addExpense = (
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
export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE
export const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
})

