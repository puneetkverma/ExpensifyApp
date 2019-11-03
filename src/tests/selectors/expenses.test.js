import moment from 'moment';
import selectExpenses from '../../../src/selectors/expenses';

const expenses = [{
    id: '1',
    des: 'gum',
    notes: '',
    amount: 123,
    createdAt: 0
}, {
    id: '2',
    des: 'rent',
    notes: '',
    amount: 1234,
    createdAt: 100
}, {
    id: '3',
    des: 'credit',
    notes: '',
    amount: 12345,
    createdAt: -10000
}]

test('test filters by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const res = selectExpenses(expenses, filters);
    expect(res).toEqual([expenses[1], expenses[2]]);
})

test('test filters by startDate value', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment,
        endDate: undefined
    }
    const res = selectExpenses(expenses, filters);
    expect(res).toEqual([expenses[1], expenses[2]]);
})