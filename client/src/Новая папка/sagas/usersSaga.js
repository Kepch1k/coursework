import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {changePassword, checkEmail, createApiLink, getUserLogin, signUpLogin} from '../api/rest/restContoller';
import {TOKENS_KEY} from '../constants/consts';
import history from '../boot/browserHistory';

const _ = require('lodash');

export function* getLoginSaga({dataToSend}) {
    try {

        const userData = dataToSend['dataToSend'];

        const rememberMeStatus = _.pick(userData, ["rememberMe"]);
        const RES = yield getUserLogin(_.omit(userData, ["rememberMe"]));
        if (RES.data) {
            const USER = RES.data.user;

            const TOKENS = RES.data.tokenPair;
            yield put({type: ACTION.SET_USER, user: USER});
            const TOKENS_JSON = JSON.stringify(TOKENS);
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
        } else if (RES.response.data === "User is baned") {
            yield put({type: ACTION.LOGIN_BANNED});
        } else if (RES.response.data === "User not founds") {
            yield put({type: ACTION.USER_ERROR, error: RES.response});
        }
    } catch (e) {
    }
}

export function* signUpSaga({dataToSend}) {
    const userData = dataToSend['dataToSend'];
    try {
        const {data} = yield signUpLogin(userData);
        const USER = data.user;
        const TOKENS = data.tokenPair;
        const TOKENS_JSON = JSON.stringify(TOKENS);
        sessionStorage.setItem(TOKENS_KEY, TOKENS_JSON);
        yield put({type: ACTION.SET_USER, user: USER});
        const dataToSendOnApi = {
            title: "Confirm email",
            email: USER.email,
            longTitle: "To confirm mail, follow the link"
        };
        const dataCreateApiLink = yield createApiLink(dataToSendOnApi);
        yield put({
            type: ACTION.GET_MAIL_SERVICE_RESULT,
            result: `For email address confirmation ${dataCreateApiLink.data}`,
            err: false
        });

        if (dataToSend['pageToRedirect']) {
            history.push(dataToSend['pageToRedirect']);
        } else {
            history.push('/');
        }

        history.push('/');
    } catch (e) {
        yield put({type: ACTION.USER_ERROR, error: e});
    }
}

export function* checkUserEmail({dataToSend}) {
    try {
        const {email} = dataToSend;
        const {data} = yield checkEmail({email: email});
        if (dataToSend.title === 'Let\'s Get Started') {
            const toRedirect = history.location.pathname;
            yield put({type: ACTION.SITE_NAVIGATION, data: {pageToRedirect: toRedirect}});
            if (data.result === "has Email") {
                history.push('/login');
            } else {
                history.push('/signup');
            }
        } else {
            if (data.result === "has Email") {
                yield put({type: ACTION.MODAL_STATE, data: {confirmEmail: false}});
                const {data} = yield createApiLink(dataToSend);
                yield put({
                    type: ACTION.GET_MAIL_SERVICE_RESULT,
                    result: data,
                    err: false,
                    otherData: {resetPasswordView: false}
                });

            } else {
                yield put({type: ACTION.GET_MAIL_SERVICE_RESULT, result: "Email not registered", err: true});
            }
        }
    } catch (e) {
        yield put({type: ACTION.USER_ERROR, error: e});
    }
}

export function* changeUserPassword({dataToSend}) {
    try {
        const {data} = yield changePassword(dataToSend);
        yield put({type: ACTION.MODAL_STATE, data: {resetPassword: false}});
        yield put({type: ACTION.GET_MAIL_SERVICE_RESULT, result: data.msg, err: data.err});
    } catch (e) {

    }
}
