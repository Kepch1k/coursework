import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import history from '../boot/browserHistory';
import {logout} from '../api/rest/restContoller';
import {TOKENS_KEY} from '../constants/consts';

export function* logoutSaga() {

    try {
        const tokens = (sessionStorage.getItem(TOKENS_KEY)) ? sessionStorage.getItem(TOKENS_KEY) : localStorage.getItem(TOKENS_KEY);
        const tokensParse = JSON.parse(tokens);
        const data = {token: tokensParse.refresh};
        yield logout(data);
        sessionStorage.clear();
        localStorage.clear();
        history.push('/');
        const userToRead = null;
        yield put({type: ACTION.DASHBOARD_CHANGED});
        yield put({type: ACTION.USER_LOGOUT, userToRead});
        yield put({type: ACTION.CHANGE_APP_STATE, data: {'userContests': true}})
    } catch (e) {
    }
}

