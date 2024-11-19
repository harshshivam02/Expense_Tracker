import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExpense, editExpense } from './Redux/rootReducer';
import store from "./Redux/Store";

import { useSelector } from "react-redux";

function Addexpense({ onClose, expenseToEdit = null }) {
  const dispatch = useDispatch();
  const budget = localStorage.getItem('budget');
  const totalExpense = useSelector((state) => state.totalExpense);
  const remainingBudget = budget - totalExpense;
  
  const [formData, setFormData] = useState({
    expenseName: expenseToEdit?.expenseName || '',
    expenseAmount: expenseToEdit?.expenseAmount || ''
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        expenseName: expenseToEdit.expenseName,
        expenseAmount: expenseToEdit.expenseAmount
      });
    }
  }, [expenseToEdit]);

  const getISTDateTime = () => {
    // Get the current UTC time
    const now = new Date();
  
    // Convert the current UTC time to IST by adding the offset of 5 hours 30 minutes (IST = UTC + 5:30)
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const ISTTime = new Date(now.getTime() + ISTOffset);
  
    // Format the date and time in 'YYYY-MM-DD' and 'HH:mm:ss' format
    const date = ISTTime.toISOString().slice(0, 10); // Extract 'YYYY-MM-DD'
    const time = ISTTime.toISOString().slice(11, 19); // Extract 'HH:mm:ss'
  
    return { date, time };
  };
  
  // Example usage
  
 
  
 
  

  const handleClickOutside = (event) => {
    if (event.target.id === "modal-background") {
      onClose();
    }
  };

  const isExpenseValid = (amount) => {
    if (!amount) return true; // Allow empty amount
    if (expenseToEdit) {
      const oldAmount = Number(expenseToEdit.expenseAmount);
      const newAmount = Number(amount);
      return (remainingBudget + oldAmount) >= newAmount;
    }
    return remainingBudget >= Number(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isExpenseValid(formData.expenseAmount)) {
      alert("Expense amount exceeds remaining budget!");
      return;
    }
    const { date, time } = getISTDateTime();
    
    if (expenseToEdit) {
        // Ensure all required properties are present
        const updatedExpense = {
            id: expenseToEdit.id, // Make sure ID is preserved
            expenseName: formData.expenseName,
            expenseAmount: formData.expenseAmount,
            date,
            time
        };
        console.log('Editing expense:', updatedExpense); // Debug log
        dispatch(editExpense(updatedExpense));
    } else {
      dispatch(addExpense({
        id: Date.now(),
        expenseName: formData.expenseName,
        expenseAmount: formData.expenseAmount,
        date,
        time
      }));
    }
    onClose();
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-10"
      onClick={handleClickOutside}
    >
      <div className="bg-black bg-opacity-85 backdrop-blur-xl shadow-lg rounded-lg p-8 flex flex-col gap-6 w-96 border-white border-opacity-50 border-[2px]">
        <h2 className="text-xl font-semibold text-white text-center">
          {expenseToEdit ? 'Edit Expense' : 'Add Expense'}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-white">
            Expense Name:
            <input
              type="text"
              name="expenseName"
              value={formData.expenseName}
              onChange={(e) => setFormData({...formData, expenseName: e.target.value})}
              className="mt-2 p-2 rounded bg-transparent border border-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter expense name"
            />
          </label>
          <label className="flex flex-col text-white">
            Expense Amount:
            <input
              type="text"
              name="expenseAmount"
              value={formData.expenseAmount}
              onChange={(e) => setFormData({...formData, expenseAmount: e.target.value})}
              className="mt-2 p-2 rounded bg-transparent border border-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter expense amount"
            />
          </label>
          <input
            type="submit"
            value={expenseToEdit ? 'Update' : 'Submit'}
            disabled={formData.expenseAmount && !isExpenseValid(formData.expenseAmount)}
            className={`mt-4 py-2 rounded cursor-pointer ${
              formData.expenseAmount && !isExpenseValid(formData.expenseAmount)
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          />
        </form>
      </div>
    </div>
  );
}

export default Addexpense;
