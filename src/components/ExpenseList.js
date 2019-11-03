import React from 'react'
import {connect} from 'react-redux';
import ExpenseListitem from './ExpenseListitem';
import selectExpenses from '../selectors/expenses'

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((i) => {
            return <ExpenseListitem key={i.id} {...i}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);