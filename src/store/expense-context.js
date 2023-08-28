import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
    items : [],
    addItem : (data) => {},
    removeItem : () => {}
})

export const ExpenseContextProvider = (props) => {
    const [itemsArr , setItemsArr] = useState([]);
    const authCtx = useContext(AuthContext);

    const restoreItems = async () => {
        const email = authCtx.userEmail.replace(/[\.@]/g , "");
        try {
            const res = await axios.get(`https://expense-tracker-1fcaf-default-rtdb.firebaseio.com/${email}/expenses.json`)

            const data = res.data;

            const realData = Object.values(data).reverse();
            setItemsArr(realData);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        restoreItems();
    },[])

    useEffect(() => {
        restoreItems();
    },[authCtx.userEmail])

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