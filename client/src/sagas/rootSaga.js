import {takeLatest} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {loginSaga, signUpSaga, isLoginSaga} from './usersSaga';
import {saveNoteSaga, updateNoteSaga, deleteNoteSaga} from './noteSaga';

function* rootSaga() {

    yield takeLatest(ACTION.USER_SIGN_UP, signUpSaga);
    yield takeLatest(ACTION.USER_LOGIN, loginSaga);
    yield takeLatest(ACTION.USER_IS_LOGIN, isLoginSaga);

    yield takeLatest(ACTION.SAVE_NOTE, saveNoteSaga);
    yield takeLatest(ACTION.UPDATE_NOTE, updateNoteSaga);
    yield takeLatest(ACTION.DELETE_NOTE, deleteNoteSaga);
}

export default rootSaga;
