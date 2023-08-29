import React, { useContext } from 'react'
import ExpenseContext from '../../store/expense-context';
import classes from "./ExpenseList.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";


const ExpenseList = () => {
  const expCtx = useContext(ExpenseContext);

  const editItemHandler = (item) => {
    const filter = expCtx.items.filter((elem) => elem !== item);
    expCtx.editItem(item, filter);
  }

  const removeItemHandler = (item) => {
    expCtx.removeItem(item);
  }

  return (
    <div className={classes.listCon}>
      <h1>Expenses</h1>
      <ul>
        {
          expCtx.items.map((item, index) => (
            <li className={classes.listItem} key={index}>
              <div className={classes.date}>{item.date}</div>
              <h3>{item.category.toUpperCase()}</h3>
              <div>{item.description}</div>
              <div>{item.amount}</div>
              <div className={classes.btn}>
                <button className={classes.edit} onClick={() => editItemHandler(item)}>
                  <AiFillEdit />
                </button>
                <button className={classes.dlt} onClick={() => removeItemHandler(item)}>
                  <AiFillDelete />
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ExpenseList
