import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./auth-context";

const ExpenseContext = React.createContext({
    items: [],
    editItems: {},
    addItem: (data) => { },
    editItem: (item) => { },
    removeItem: () => { }
})

export const ExpenseContextProvider = (props) => {
    const [itemsArr, setItemsArr] = useState([]);
    const [editItems, setEditItems] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        setItemsArr([])
    }, [authCtx.isLoggedIn])

    const restoreItems = async () => {
        const email = authCtx.userEmail.replace(/[.@]/g, "");
        try {
            const res = await axios.get(`https://expense-tracker-1fcaf-default-rtdb.firebaseio.com/${email}/expenses.json`)

            const data = res.data;

            if (data) {
                const realData = Object.values(data).reverse();
                setItemsArr(realData);
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (authCtx.userEmail) {
            restoreItems()
        }
    }, [authCtx.userEmail])

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            restoreItems()
        }
    }, [authCtx.isLoggedIn])

    const addItemHandler = (item) => {
        setItemsArr([...itemsArr, item])
    }

    const editItemHandler = (item , filtered) => {
        setEditItems(item);
        setItemsArr(filtered);
    }

    const removeItemHandler = async (item) => {
        const filtered = itemsArr.filter((elem) => elem !== item);
        setItemsArr([...filtered]);

        const email = authCtx.userEmail.replace(/[@.]/g,"");
        try {
            const res = await axios.get(`https://expense-tracker-1fcaf-default-rtdb.firebaseio.com/${email}/expenses.json`)

            const data = res.data;

            const itemId = Object.keys(data).find((id) => data[id].id === item.id);

            try {
                const res = await axios.delete(`https://expense-tracker-1fcaf-default-rtdb.firebaseio.com/${email}/expenses/${itemId}.json`)
            } catch (error) {
                console.log("ERROR: " , error);
            }
        } catch (error) {
            console.log("ERROR: " , error);
        }
    }

    const contextData = {
        items: itemsArr,
        editItems : editItems,
        addItem: addItemHandler,
        editItem : editItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <ExpenseContext.Provider value={contextData}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext;