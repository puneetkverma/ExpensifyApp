import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from '../components/ExpenseListFilters'

const ExpenseDashboardPage = () => (
    <div>
        ExpenseDashboardPage
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;