import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {changePassword, checkEmail, userIsLogin, userLogin, userSignUpLogin} from '../api/rest/restContoller';
import {ACCESS_TOKEN,TOKENS_KEY} from '../constants/consts';
import history from '../boot/browserHistory';

const _ = require('lodash');

// login user
export function* loginSaga({dataToSend}) {
    try {
        console.log("new project login:",dataToSend);
        const userData = dataToSend['dataToSend'];

        const rememberMeStatus = _.pick(userData, ["rememberMe"]);
        const RES = yield userLogin(_.omit(userData, ["rememberMe"]));
        if (RES.data) {
            const USER = RES.data.user;

            const TOKENS = RES.data.tokenPair;
            console.log(TOKENS);
            yield put({type: ACTION.SET_USER, user: USER});
            const TOKENS_JSON = JSON.stringify(TOKENS);
            console.log( localStorage.getItem(TOKENS));

            if (rememberMeStatus) {
                localStorage.setItem(TOKENS_KEY, TOKENS_JSON);
            } else {
                sessionStorage.setItem(TOKENS_KEY, TOKENS_JSON);
            }
            if (dataToSend['pageToRedirect']) {
                history.push(dataToSend['pageToRedirect']);
            } else {
                history.push('/');
            }
        } else if (RES.response.data === "ManagePanel is baned") {
            yield put({type: ACTION.LOGIN_BANNED});
        } else if (RES.response.data === "ManagePanel not founds") {
            yield put({type: ACTION.USER_ERROR, error: RES.response});
        }
    } catch (e) {
    }
}

// sign up user
export function* signUpSaga({dataToSend}) {
   // console.log("new project register:",dataToSend);
    const userData = dataToSend['dataToSend'];
    try {
        const RES = yield userSignUpLogin(userData);
        if (RES.data) {
            const USER = RES.data.user;

            const TOKENS = RES.data.tokenPair;
            console.log(TOKENS);
            yield put({type: ACTION.SET_USER, user: USER});
            const TOKENS_JSON = JSON.stringify(TOKENS);
            localStorage.setItem(TOKENS_KEY, TOKENS_JSON);
            console.log( localStorage.getItem(TOKENS));

            if (dataToSend['pageToRedirect']) {
                history.push(dataToSend['pageToRedirect']);
            } else {
                history.push('/');
            }
        }
        if (dataToSend['pageToRedirect']) {
            history.push(dataToSend['pageToRedirect']);
        } else {
            history.push('/');
        }

        history.push('/');
    } catch (e) {
      //  yield put({type: ACTION.USER_ERROR, error: e});
    }
}

export function* isLoginSaga() {
    try {
        const token = (sessionStorage.getItem(TOKENS_KEY)) ? sessionStorage.getItem(TOKENS_KEY) : localStorage.getItem(TOKENS_KEY);
        if (token) {
            yield put({type: ACTION.GET_USER});
            const {data} = yield userIsLogin();
            yield put({type: ACTION.SET_USER, user: data});
        }
    } catch (e) {
        yield put({type: ACTION.IS_LOGIN_ERROR, error: e});
    }
}
