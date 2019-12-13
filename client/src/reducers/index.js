import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducers from './userReducers';
import modalReducers from './modalReducers';
import UI_Elements from './UI_Elements';
import formInitialValues from './formInitialValues';
import Note from './Note';
import Notification from './Notification';

const appReducer = combineReducers({
    userReducers,
    modalReducers,
    UI_Elements,
    formInitialValues,
    Note,
    Notification,
    form: formReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
