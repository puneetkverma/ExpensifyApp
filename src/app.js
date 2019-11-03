import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import getVisible from './selectors/expenses'
import { setTextFilter } from './actions/filters'
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({des: 'water bill', amount: 500, createdAt: 6000}));
store.dispatch(addExpense({des: 'elctricity bill', amount: 1500, createdAt: 5000}));
store.dispatch(addExpense({des: 'rent', amount: 5500}));
store.dispatch(addExpense({des: 'food bill', amount: 1570}));

// store.dispatch(setTextFilter('water'));
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

const state = store.getState();
console.log(getVisible(state.expenses, state.filters));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
