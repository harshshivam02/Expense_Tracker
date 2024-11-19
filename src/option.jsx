import { removeExpense, editExpense } from './Redux/rootReducer';
import { useDispatch } from 'react-redux';

const Option = ({ onClose, expense, onEdit }) => {
    const dispatch = useDispatch();
    
    const handleRemove = () => {
        dispatch(removeExpense(expense));
        onClose();
    };

    return (
        <div className='absolute bottom-full right-0 mb-2 bg-black border-2 border-white border-opacity-70 rounded-md p-1 w-24 flex flex-col gap-1 shadow-lg'>
            <button 
                className='bg-white text-black p-1 rounded-md hover:bg-gray-400 transition-all duration-300 text-xs font-medium'
                onClick={handleRemove}
            >
                Remove
            </button>
            <button 
                className='bg-white text-black p-1 rounded-md hover:bg-gray-400 transition-all duration-300 text-xs font-medium'
                onClick={() => {
                    onEdit(expense);
                    onClose();
                }}
            >
                Edit
            </button>
        </div>
    );
};

export default Option;