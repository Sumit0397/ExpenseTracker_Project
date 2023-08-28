import React, { useState } from "react";

const ExpenseContext = React.createContext({
    items : [],
    addItem : (data) => {},
    removeItem : () => {}
})

export const ExpenseContextProvider = (props) => {
    const [itemsArr , setItemsArr] = useState([]);

    const addItemHandler = (item) => {
        setItemsArr([...itemsArr , item])
    }

    const removeItemHandler = () => {

    }

    const contextData = {
        items : itemsArr,
        addItem : addItemHandler,
        removeItem : removeItemHandler
    }

    return (
        <ExpenseContext.Provider value={contextData}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext;