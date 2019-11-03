
// Expenses Reducers
const expensesReducersDefaultState = [];
export default (state = expensesReducersDefaultState, action) => {
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
