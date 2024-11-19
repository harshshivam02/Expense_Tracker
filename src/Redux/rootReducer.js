const initialState = {
    expense: [],
    totalExpense: 0,
    budget: 0,
}
  //-------------------action types--------------------------------
const ADDEXPENSE = 'ADDEXPENSE'
const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
const EDIT_EXPENSE = 'EDIT_EXPENSE'
const CLEAR_EXPENSE = 'CLEAR_EXPENSE'


//-------------------action creators--------------------------------
export const addExpense = (expense) => {
    return {
        type: ADDEXPENSE,
        payload: expense
    }
}

export const removeExpense = (expense) => {
    return {
        type: REMOVE_EXPENSE,
        payload: expense
    }
}

export const editExpense = (expense) => {
    return {
        type: EDIT_EXPENSE,
        payload: expense
    }
}

export const clearExpense = () => {
    return {
        type: CLEAR_EXPENSE,
    }
}






const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ADDEXPENSE:
            return {
                ...state,
                expense: [...state.expense, action.payload],
                totalExpense: state.totalExpense + Number(action.payload.expenseAmount)
            }
        case REMOVE_EXPENSE:
            return {
                ...state,
                expense: state.expense.filter(expense => expense.id !== action.payload.id),
                totalExpense: state.totalExpense - Number(action.payload.expenseAmount)
            }
        case EDIT_EXPENSE:
            try {
                const oldExpense = state.expense.find(exp => exp.id === action.payload.id);
                if (!oldExpense) {
                    console.error('Expense not found for editing:', action.payload.id);
                    return state;
                }
                
                const amountDiff = Number(action.payload.expenseAmount) - Number(oldExpense.expenseAmount);
                return {
                    ...state,
                    expense: state.expense.map(exp => exp.id === action.payload.id ? action.payload : exp),
                    totalExpense: state.totalExpense + amountDiff
                };
            } catch (error) {
                console.error('Error in EDIT_EXPENSE:', error);
                return state;
            }
        case CLEAR_EXPENSE:
            return {
                ...state,
                expense: [],
                totalExpense: 0
            }
        default:
            return state;
    }

    
}

export default rootReducer




