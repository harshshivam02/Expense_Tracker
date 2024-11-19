import { legacy_createStore as createStore } from 'redux';
import rootReducer from './rootReducer';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Could not load state:', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('reduxState', JSON.stringify(state));
  } catch (err) {
    console.error('Could not save state:', err);
  }
};

// Initialize store with persisted state
const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

// Subscribe to save updates to localStorage
store.subscribe(() => saveState(store.getState()));

export default store;
