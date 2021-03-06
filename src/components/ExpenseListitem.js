import React from 'react';
import {connect} from 'react-redux';
import {removeExpense} from '../actions/expenses';
import {Link} from 'react-router-dom';

const ExpenseListitem = ({des, amount, createdAt, id, dispatch}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{des}</h3>
        </Link>
        <p>{amount}-{createdAt}</p>
    </div>
);


export default connect()(ExpenseListitem);