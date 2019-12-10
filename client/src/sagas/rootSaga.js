import {takeLatest} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {loginSaga, signUpSaga, isLoginSaga} from './usersSaga';

function* rootSaga() {

    yield takeLatest(ACTION.USER_SIGN_UP, signUpSaga);
    yield takeLatest(ACTION.USER_LOGIN, loginSaga);
    yield takeLatest(ACTION.USER_IS_LOGIN, isLoginSaga);
}

export default rootSaga;
