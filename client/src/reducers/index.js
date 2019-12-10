import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducers from './userReducers';
import modalReducers from './modalReducers';
import UI_Elements from './UI_Elements';
import formInitialValues from './formInitialValues';

const appReducer = combineReducers({
    userReducers,
    modalReducers,
    UI_Elements,
    formInitialValues,
    form: formReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
