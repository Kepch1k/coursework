import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducers from './userReducers';
import getAllUsersReducer from './getAllUsersReducer';
import contestReducers from './createContestReducers';
import creditCardReducers from './creditCardReducers';
import mailServiceReducers from './mailServiceReducers';
import modalReducers from './modalReducers';
import siteNavigationReducers from './siteNavigationReducers';
import userContestsReducers from './userContestsReducers';
import AppReducers from './AppReducers';
import ActiveContestFilterReducer from './ActiveContestFilterReducer';
import ContestReducer from './ContestReducer';
import UI_Elements from './UI_Elements';

const appReducer = combineReducers({
    userReducers,
    getAllUsersReducer,
    contestReducers,
    creditCardReducers,
    mailServiceReducers,
    modalReducers,
    siteNavigationReducers,
    userContestsReducers,
    AppReducers,
    ActiveContestFilterReducer,
    ContestReducer,
    UI_Elements,
    form: formReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
