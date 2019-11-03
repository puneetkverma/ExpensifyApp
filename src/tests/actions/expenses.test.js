import { addExpense, removeExpense, editExpense} from '../../../src/actions/expenses';

test('should setup remove expense', () => {
    const action = removeExpense('123abc');
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
})

test('should setup edit expense', () => {
    const action = editExpense('123', {'a': 1});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        update: {'a': 1}
    });
})

test('should setup add expense', () => {
    const expenseData = {
        des: 'rent',
        note: 'lauda',
        createdAt: 100,
        amount: 50000
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENCE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
})

test('should setup add expense with default values', () => {
    const expenseData = {
        des: '',
        note: '',
        createdAt: 0,
        amount: 0
    };
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENCE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
})