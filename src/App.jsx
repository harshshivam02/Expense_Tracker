import Addexpense from './Addexpense';
import ExpenseHistory from './ExpenseHistory';
import './App.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';

function App() {
  
  const expense =useSelector((state) => state.expense);
  const totalExpense = useSelector((state) => state.totalExpense);
    const dispatch = useDispatch();



 const [showexpense, setShowexpense] = useState(false);
 const [budget, setBudget] = useState(() => {
   const savedBudget = localStorage.getItem('budget');
   return savedBudget ? parseFloat(savedBudget) : null;
 });
 const [showBudgetForm, setShowBudgetForm] = useState(() => {
   return !localStorage.getItem('budget');
 });
 const [expenseToEdit, setExpenseToEdit] = useState(null);
 const [previousBudget, setPreviousBudget] = useState(null);

 useEffect(() => {
   if (budget !== null) {
     localStorage.setItem('budget', budget.toString());
   }
 }, [budget]);

 const handleEdit = (expense) => {
  setExpenseToEdit(expense);
  setShowexpense(true);
 };

 const handleClose = () => {
  setShowexpense(false);
  setExpenseToEdit(null);
 }

 const handleBudgetSubmit = (e) => {
  e.preventDefault();
  const budgetAmount = parseFloat(e.target.budget.value);
  setBudget(budgetAmount);
  setShowBudgetForm(false);
 }

 
 const handleEditBudget = () => {
  setPreviousBudget(budget);
  setShowBudgetForm(true);
 };

 const handleCancelBudgetEdit = () => {
  if (previousBudget !== null) {
    setBudget(previousBudget);
    localStorage.setItem('budget', previousBudget.toString());
  }
  setShowBudgetForm(false);
  setPreviousBudget(null);
 };

 const getBudgetStatus = () => {
  if (!budget) return { isLow: false, isExceeded: false };
  const remainingBudget = budget - totalExpense;
  const budgetPercentage = (remainingBudget / budget) * 100;
  return {
    isLow: budgetPercentage <= 10 && budgetPercentage > 0,
    isExceeded: remainingBudget <= 0
  };
};

 useEffect(() => {
  if (budget && totalExpense > budget) {
    alert("Warning: Your expenses have exceeded the budget!");
  }
}, [totalExpense, budget]);

 if (showBudgetForm) {
  return (
    <div className='bg-black text-white min-h-screen p-4'>
      <div>
        <h1 className='text-4xl font-bold text-white text-center mb-20'>Expense Tracker</h1>
      </div>
      <div className='flex items-center justify-center'>
        <form onSubmit={handleBudgetSubmit} className='flex flex-col gap-4 border-2 border-white p-8 rounded-md relative'>
          <button 
            type="button"
            onClick={handleCancelBudgetEdit}
            className='absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center justify-center'
            title="Close"
          >
            ×
          </button>
          <h2 className='text-2xl font-bold text-center'>Set Your Budget</h2>
          <input
            type="number"
            name="budget"
            placeholder="Enter your budget"
            required
            className='p-2 rounded-md text-black'
            min="0"
          />
          <button 
            type="submit" 
            className='bg-white text-black p-2 rounded-md hover:bg-gray-400 transition-all duration-300'
          >
            Set Budget
          </button>
        </form>
      </div>
    </div>
  );
 }

 return (
    <div className='bg-black text-white min-h-screen p-4'>
    <div >
      <h1 className='text-4xl font-bold text-white text-center'>Expense Tracker</h1>
      </div>
    <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 w-full lg:w-[90%] xl:w-[80%] mx-auto mt-10 md:mt-20'>
      <div className='flex flex-col text-left gap-2 border-2 border-white border-opacity-70 p-8 rounded-md w-full md:w-1/3 h-40 justify-center'>
         <span className='text-lg font-semibold'>Total Expense</span>
         <span className='text-2xl'>₹ {totalExpense ? totalExpense.toFixed(2) : '0.00'}</span>  
      </div>
      <div className={`flex flex-col text-left gap-2 border-2 ${
        getBudgetStatus().isLow 
          ? 'border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]' 
          : getBudgetStatus().isExceeded
            ? 'border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)]'
            : 'border-white border-opacity-70'
      } px-8 py-2 rounded-md w-full md:w-1/3 h-40 justify-center relative`}>
        <span className='text-lg font-semibold'>Total Budget</span>
        <div className='flex items-center gap-2'>
          <span className='text-2xl'>₹ {budget ? budget.toFixed(2) : '0.00'}</span>
          <button 
            onClick={handleEditBudget}
            className='p-1 hover:bg-gray-700 rounded-full transition-all duration-300'
            title="Edit Budget"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white opacity-70 hover:opacity-100"
            >
              <path
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className='flex items-center gap-2 italic'>
          <span className='text-sm text-gray-400'>Remaining Budget :</span>
          <span className='text-sm text-gray-400'>
            ₹ {budget ? Math.max(0, (budget - totalExpense)).toFixed(2) : '0.00'}
          </span>
        </div>
      </div>
      <div className='flex flex-col text-center gap-2 '>
           <button className={`bg-white text-black p-4 rounded-md transition-all duration-300 ${
             getBudgetStatus().isExceeded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
           }`} 
           onClick={() => setShowexpense(true)}
           disabled={getBudgetStatus().isExceeded}
           >Add Expense</button>
      </div>

      </div>
      {showexpense && <Addexpense onClose={handleClose} expenseToEdit={expenseToEdit} />}
      <div className='mt-10 md:mt-20'> 
      <h2 className='text-2xl font-bold text-center mb-6'>Expense History</h2>
      {expense.length === 0 ? (
        <p className='text-center text-lg font-semibold'>No expenses added yet.</p>
      ) : (
        <div className='max-w-[90%] mx-auto'>
        {expense.map((exp) => (
          <ExpenseHistory key={exp.id} expense={exp} onEdit={handleEdit} />
        ))}
         
        </div>
      )}
      </div>
    </div>
    
    
  )
}

export default App
