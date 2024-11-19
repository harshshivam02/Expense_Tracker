import { useState, useEffect } from 'react';
import Option from './option';

const ExpenseHistory = ({ expense, onEdit }) => {
  const [showOption, setShowOption] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOption && !event.target.closest('.options-container')) {
        setShowOption(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOption]);

  return (
    <div className="bg-black text-white p-2 rounded-md relative">
      <div 
        className="flex flex-wrap justify-between items-center mt-2 border-[2px] border-white border-opacity-70 rounded-md w-10/12 mx-auto relative cursor-pointer"
        onClick={() => setShowDateTime(!showDateTime)}
      >
        <div className="flex flex-col gap-2 p-4">
          <span className="text-lg font-semibold">{expense?.expenseName || 'Expense Name'}</span>
          <span className="text-sm text-gray-400">₹ {expense?.expenseAmount || 'Expense Amount'}</span>
        </div>
        <div
          className="options-container relative cursor-pointer transition-all duration-300 invert pr-5"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent div's onClick
            setShowOption(!showOption);
          }}
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="bi bi-three-dots-vertical hover:opacity-70"
          >
            <g id="SVGRepo_iconCarrier">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
            </g>
          </svg>
          {showOption && (
            <Option
              onClose={() => setShowOption(false)}
              expense={expense}
              onEdit={(exp) => {
                onEdit(exp);
                setShowOption(false);
              }}
            />
          )}
        </div>
        {showDateTime && (
          <div className="w-full flex justify-end p-2 text-right text-sm text-gray-400 whitespace-nowrap sm:justify-between sm:text-center sm:flex-wrap">
            <span className="block sm:inline">{expense?.date || 'Date'}</span>
            <span className="block sm:inline">{expense?.time || 'Time'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
