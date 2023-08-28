import React, { useContext } from 'react'
import ExpenseContext from '../../store/expense-context';
import classes from "./ExpenseList.module.css";

const ExpenseList = () => {
    const expCtx = useContext(ExpenseContext);

  return (
    <div className={classes.listCon}>
      <h1>Expenses</h1>
      <ul>
      {
        expCtx.items.map((item , index) => (
            <li className={classes.listItem} key={index}>
                <div className={classes.date}>{item.date}</div>
                <h3>{item.category.toUpperCase()}</h3>
                <div>{item.description}</div>
                <div>{item.amount}</div>
            </li>
        ))
      }
      </ul>
    </div>
  )
}

export default ExpenseList
