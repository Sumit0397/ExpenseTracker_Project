import React, { useContext, useRef } from 'react';
import classes from "./ExpenseForm.module.css";
import { Button } from 'react-bootstrap';
import ExpenseContext from '../../store/expense-context';

const ExpenseForm = () => {
    const amountRef = useRef();
    const desRef = useRef();
    const dateRef = useRef();
    const catRef = useRef();

    const onsubmitHandler = (e) => {
        e.preventDefault();

        const expCtx = useContext(ExpenseContext);

        const expenseDetails = {
            amount : amountRef.current.value,
            description : desRef.amount.value,
            date : dateRef.amount.value,
            category : catRef.amount.value
        }
        
        expCtx.addItem(expenseDetails);
        console.log(expenseDetails)
    }

  return (
    <div className={classes.expCon}>
      <form onSubmit={onsubmitHandler}>
        <section>
            <div>
                <label>
                    Amount
                </label>
                <input type='numnber' ref={amountRef}/>
            </div>
            <div>
                <label>
                    Description
                </label>
                <input type='text' ref={desRef}/>
            </div>
            <div>
                <label>
                    Date
                </label>
                <input type='date' ref={dateRef}/>
            </div>
            <div>
                <label>
                    Category
                </label>
                <select ref={catRef}>
                    <option value="food">Food</option>
                    <option value="petrol">Petrol</option>
                    <option value="salary">Salary</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </section>
        <Button type="submit">Add Expense</Button>
      </form>
    </div>
  )
}

export default ExpenseForm
