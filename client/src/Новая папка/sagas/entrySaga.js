import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {changeEntryStatus, createEntry} from '../api/rest/restContoller';

export function* sendEntry({dataToSend}) {

    let FinalDataToSend = new FormData();

    for (let key in dataToSend) {
        if (dataToSend.hasOwnProperty(key)) {
            if ("file" === key) {

                for (let properties in dataToSend['file'][0]) {
                    if (dataToSend['file'][0].hasOwnProperty(properties)) {
                        FinalDataToSend.append(dataToSend['file'][0][properties].name, dataToSend['file'][0][properties]);
                    }
                }
            } else {
                FinalDataToSend.append(key, JSON.stringify(dataToSend[key]));
            }
        }
    }


    const {data} = yield createEntry(FinalDataToSend);

    if (data === "OK") {
        yield put({type: ACTION.NEW_MESSAGE, msg: "Entry was created", error: false});
    } else {
        yield put({type: ACTION.NEW_MESSAGE, msg: "Something went wrong", error: true});
    }
}

export function* managed({dataToSend}) {


    const {data} = yield changeEntryStatus(dataToSend);
    if (data.contest) {
        yield put({type: ACTION.CONTEST_UPDATE, contest: data.contest});
    }

    if (dataToSend.action === "REJECT") {
        if (data.entry) {

            yield put({type: ACTION.CHOOSE_WINNER, entry: data.entry});
        }
    } else {
        if (data.entry) {
            yield put({type: ACTION.ENTRY_UPDATE, entry: data.entry});
        }
    }


}