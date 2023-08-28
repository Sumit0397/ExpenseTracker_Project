import React, { useContext } from 'react'
import ExpenseContext from '../../store/expense-context'

const ExpenseList = () => {
    const expCtx = useContext(ExpenseContext);

  return (
    <div>
      <ul>
      {
        expCtx.items.map((item) => (
            <li >
                <div>{item.date}</div>
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
