console.log('stated...');

import { createStore } from 'redux';

// Action generators - functions that return action objects



const incrementCount = ({incrementby = 1}={}) => ({
    type: 'INCREMENT',
    incrementby
});


const decrementCount = ({decrementby = 1}={}) => ({
    type: 'DECREMENT',
    decrementby
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({val = 1100}={}) => ({
    type: 'SET',
    val
});

// Reducer for count
// 1: reducer are pure function
// 2: never change state or function

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementby = typeof action.incrementby === 'number' ? action.incrementby : 1;
            return {
                count: state.count + incrementby
            }
        case 'DECREMENT':
        const decrementby = typeof action.decrementby === 'number' ? action.decrementby : 1;
            return {
                count: state.count - decrementby
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.val
            }
        default: 
            return state;
    } 
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount({ incrementby: 10 }));

store.dispatch(decrementCount({decrementby: 5}));

store.dispatch(resetCount());

store.dispatch(setCount({val: 1111}));
