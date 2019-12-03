import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {sendContestPayment} from '../api/rest/restContoller';

export function* sendRequisites({data}) {
    try {
        yield put({type: ACTION.SEND_CARD_REQUISITES_REQUEST});
        const result = yield sendContestPayment(data);

        if (result.hasOwnProperty('data')) {

            yield put({type: ACTION.SEND_CARD_REQUISITES_RESULT, data: result.data.status});
            yield put({type: ACTION.SELECTED_CONTEST_TYPE, contestTypes: []});
            yield put({type: ACTION.CONTEST_PROGRESSING, stage: 1, form: null});
            yield put({type: ACTION.CHANGE_APP_STATE, data: {needUpdate: true}})

        } else {

            yield put({type: ACTION.SEND_CARD_REQUISITES_RESULT, data: result.response.data})
        }


    } catch (e) {
    }

}
