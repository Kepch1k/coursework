import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {contestFilter, getContestById} from '../api/rest/restContoller';

export function* changeFilterTags({dataToSend}) {
    try {
        yield put({type: ACTION.CHANGE_FILTER_TAGS, data: dataToSend});
    } catch (e) {
        console.log(e)

    }
}

export function* sendFilterData({dataToSend}) {
    try {
        yield put({type: ACTION.FILTERED_CONTEST_REQUEST});


        const {data} = yield contestFilter({url: dataToSend});

        yield put({type: ACTION.SET_FILTERED_CONTEST, contests: data});

    } catch (e) {
        console.log(e)

    }
}

export function* getById({id}) {
    try {

        const {data} = yield getContestById(id);

        yield put({type: ACTION.CONTESTS_BY_ID_RESPONSE, contest: data.contest, entries: data.entries});

    } catch (e) {
        console.log(e)

    }
}


export function* getStarterContests() {
    try {

        yield put({type: ACTION.FILTERED_CONTEST_REQUEST});
        const {data} = yield contestFilter({url: 'http://192.168.0.111:3000/api/contestFilter/?'});

        yield put({type: ACTION.SET_FILTERED_CONTEST, contests: data});

    } catch (e) {
        console.log(e)

    }
}


