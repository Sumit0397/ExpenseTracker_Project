import React, { useContext, useEffect, useRef } from 'react';
import classes from "./ExpenseForm.module.css";
import { Button } from 'react-bootstrap';
import ExpenseContext from '../../store/expense-context';
import AuthContext from '../../store/auth-context';
import axios from 'axios';

const ExpenseForm = () => {
    const amountRef = useRef();
    const desRef = useRef();
    const dateRef = useRef();
    const catRef = useRef();
    const formRef = useRef();

    const expCtx = useContext(ExpenseContext);
    const authCtx = useContext(AuthContext);

    console.log(authCtx.userEmail);

    useEffect(() => {
        if(expCtx.editItems !== null){
            amountRef.current.value = expCtx.editItems.amount;
            desRef.current.value = expCtx.editItems.description;
            dateRef.current.value = expCtx.editItems.date;
            catRef.current.value = expCtx.editItems.category;
        }
    },[expCtx.editItems])

    const onsubmitHandler = async (e) => {
        e.preventDefault();

        if(expCtx.editItems !== null){
            expCtx.removeItem(expCtx.editItems);
            expCtx.editItems = {};
        }

        const expenseDetails = {
            id : Math.random().toString(),
            amount : amountRef.current.value,
            description : desRef.current.value,
            date : dateRef.current.value,
            category : catRef.current.value
        }

        const email = authCtx.userEmail.replace(/[.@]/g,"")
        
        try {
            const res = await axios.post(`https://expense-tracker-1fcaf-default-rtdb.firebaseio.com/${email}/expenses.json` , expenseDetails);
        } catch (error) {
            console.log("Error: " , error);
        }

        expCtx.addItem(expenseDetails);
        console.log(expenseDetails)
        formRef.current.reset();
    }

  return (
    <div className={classes.expCon}>
      <form onSubmit={onsubmitHandler} ref={formRef}>
        <section>
            <div>
                <label>
                    Amount
                </label>
                <input type='number' ref={amountRef}/>
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
