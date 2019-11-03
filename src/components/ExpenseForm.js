import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
// now.format('MMM Do, YYYY')

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            des: props.expense ? props.expense.des : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount.toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderfocused: false,
            error: ''
        }
    }
    onDesChange = (e) => {
        const des = e.target.value;
        this.setState(() => ({ des}));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt}));
        }  
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({ calenderfocused: focused}));
    }
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.des || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount'}));
        } else {
            if(this.state.error){
                this.setState(() => ({error: ''}));
            }
            // console.log('submitted!');
            this.props.onSubmit({
                des: this.state.des,
                amount: parseFloat(this.state.amount, 10),
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            })
        }
    }
    render(){
        return (
            <div>
                {this.state.error && <p>Error: {this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        autoFocus
                        value={this.state.des}
                        onChange={this.onDesChange}
                        placeholder="Description"
                        type="text"/>
                    <input
                        autoFocus
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        placeholder="Amount"
                        type="text"/>
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderfocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        placeholder="Add a note for you expense">
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}

