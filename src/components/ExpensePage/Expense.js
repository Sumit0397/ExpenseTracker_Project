import React, { Fragment } from 'react'
import ExpenseList from './ExpenseList'

const Expense = () => {
  return (
    <Fragment>
        <ExpenseForm/>
        <ExpenseList/>
    </Fragment>
  )
}

export default Expense
