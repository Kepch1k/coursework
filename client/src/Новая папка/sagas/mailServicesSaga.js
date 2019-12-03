import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {sendApi} from '../api/rest/restContoller';
import history from '../boot/browserHistory';
import {TOKENS_KEY} from "../constants/consts";

export function* sendApiToServer({dataToSend}) {
    try {
        const {data} = yield sendApi(dataToSend);
        {
            if (data.hasOwnProperty('otherData')) {
                if (data.otherData.hasOwnProperty('tokenPair')) {

                    const TOKENS_JSON = JSON.stringify(data.otherData.tokenPair);
                    sessionStorage.setItem(TOKENS_KEY, TOKENS_JSON);
                    yield put({type: ACTION.CHANGE_APP_STATE, data: {'user': true}})
                }
                if (data.otherData.hasOwnProperty('resetPassword')) {
                    yield put({type: ACTION.MODAL_STATE, data: {resetPassword: true}});

                    yield put({type: ACTION.GET_MAIL_SERVICE_RESULT, result: null, err: false, email: data.email});
                }
            }
        }
        yield put({type: ACTION.GET_MAIL_SERVICE_RESULT, result: data['msg'], err: data.err});

        history.push(data['linkToRedirect']);
    } catch (e) {
    }
}