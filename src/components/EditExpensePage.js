import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses'

const EditExpensePage = (props) => {
    return (
        <div>
            EditExpensePage
            <ExpenseForm
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.match.params.id, expense));
                    console.log('updated!', expense);
                    props.history.push('/');
                }}
                expense={props.expense} />
                <button onClick={() => {
                    props.dispatch(removeExpense(props.match.params.id));
                    console.log('removed!');
                    props.history.push('/');
                }}>Remove</button>
        </div>
    );
}

const mapToStateProps = (state, props) => {
    return {
        expense: state.expenses.find((e) => e.id === props.match.params.id)
    }
}

export default connect(mapToStateProps)(EditExpensePage);