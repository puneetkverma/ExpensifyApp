import { createStore, combineReducers} from 'redux';
import expensesReducers from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import modal from '../reducers/modal';

// store creation
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducers,
            filters: filtersReducer,
            modal: modal
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}

