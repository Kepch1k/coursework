import {takeLatest} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {changeUserPassword, checkUserEmail, loginSaga, signUpSaga} from './usersSaga';
import {isLoginSaga} from './isLoginSaga';
import {getAllUsersSaga} from './getAllUsersSaga';
import {changeBanStatusSaga} from './changeBanStatusSaga';
import {logoutSaga} from './logoutSaga';
import {deleteUserContest, receiveUserContests, sendContest} from './contestSaga';
import {managed, sendEntry} from './entrySaga';
import {sendApiToServer} from './mailServicesSaga';
import {sendRequisites} from './creditCardSaga';
import {changeFilterTags, getById, getStarterContests, sendFilterData} from './ActiveContestFilterSaga';

function* rootSaga() {
    yield takeLatest(ACTION.GET_ALL_USERS, getAllUsersSaga);
    yield takeLatest(ACTION.USER_SIGN_UP, signUpSaga);
    yield takeLatest(ACTION.USER_LOGIN, loginSaga);
    yield takeLatest(ACTION.USER_IS_LOGIN, isLoginSaga);
    yield takeLatest(ACTION.CHANGE_IS_BANED, changeBanStatusSaga);
    yield takeLatest(ACTION.IS_LOGOUT, logoutSaga);
    yield takeLatest(ACTION.SEND_CONTEST, sendContest);
    yield takeLatest(ACTION.SEND_CARD_REQUISITES, sendRequisites);
    yield takeLatest(ACTION.CHECK_USER_EMAIL, checkUserEmail);
    yield takeLatest(ACTION.MAIL_SERVICE, sendApiToServer);
    yield takeLatest(ACTION.CHANGE_USER_PASSWORD, changeUserPassword);
    yield takeLatest(ACTION.GET_USER_CONTESTS, receiveUserContests);
    yield takeLatest(ACTION.DELETE_CONTEST, deleteUserContest);
    yield takeLatest(ACTION.CHANGE_CONTEST_FILTER, changeFilterTags);
    yield takeLatest(ACTION.GET_CONTESTS_BY_STARTER_FILTER, getStarterContests);
    yield takeLatest(ACTION.SEND_FILTER_DATA, sendFilterData);
    yield takeLatest(ACTION.CONTESTS_BY_ID_REQUEST, getById);
    yield takeLatest(ACTION.SEND_ENTRY, sendEntry);
    yield takeLatest(ACTION.ENTRY_MANAGED, managed);
}

export default rootSaga;
