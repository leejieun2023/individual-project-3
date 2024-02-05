import { createStore, combineReducers } from 'redux';
import lettersReducer from '../modules/letters';

const rootReducer = combineReducers({
    letters: lettersReducer,
})

const store = createStore(rootReducer);

export default store;
