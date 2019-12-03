import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {userBanStatusUpdate} from '../api/rest/restContoller';

export function* changeBanStatusSaga({id, banStatus}) {
    try {
        const res = yield userBanStatusUpdate(id, {
            'banStatus': !banStatus,
        });
        yield put({type: ACTION.CHANGE_IS_BANED_SUCCESS});
        yield put({type: ACTION.GET_ALL_USERS_UPDATE, data: res.data});
    } catch (e) {
        yield put({type: ACTION.CHANGE_IS_BANED_ERROR, error: e});
    }
}

