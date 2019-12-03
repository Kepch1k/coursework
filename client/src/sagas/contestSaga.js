import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {createContest, deleteContest, getUserContests, updateContest} from '../api/rest/restContoller';

const _ = require('lodash');

function isObjectAndHasProperty(obj, property) {
    return _.isObject(obj) && (obj.hasOwnProperty(property));
}

function preparingDataToSend(dataToSend) {
    let FinalDataToSend = new FormData();

    const newDataToSend = _.cloneDeep(dataToSend);
    const fileNames = [];
    for (let key in newDataToSend) {

        if (newDataToSend.hasOwnProperty(key)) {
            const properties = newDataToSend[key];


            if ("uploadFile" === key) {
                for (let key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        FinalDataToSend.append(properties[key].name, properties[key]);
                        fileNames.push(properties[key].name);
                    }
                }
            } else if (_.isArray(properties)) {
                newDataToSend[key] = properties.map((item) => {
                    if (isObjectAndHasProperty(item, 'value')) {
                        return item['value'];
                    } else {
                        return item;
                    }
                });
                FinalDataToSend.append(key, JSON.stringify(newDataToSend[key]));
            } else if (isObjectAndHasProperty(properties, 'value')) {

                FinalDataToSend.append(key, JSON.stringify(properties['value']));
            } else {
                FinalDataToSend.append(key, JSON.stringify(newDataToSend[key]));
            }
        }
    }
    FinalDataToSend.append('fileNames', JSON.stringify(fileNames));
    return FinalDataToSend;
}

export function* sendContest({dataToSend, id}) {

    if (dataToSend.id) {
        const preDataToSend = _.omit(dataToSend, ['status', 'price', 'fileNames']);
        let FinalDataToSend = preparingDataToSend(preDataToSend);
        if (dataToSend['fileNames']) {
            dataToSend['fileNames'].forEach(function (item) {

                FinalDataToSend.delete(item);
            })
        }

        const {data} = yield updateContest(FinalDataToSend, id);
        const newProps = _.pick(data.contest, ['status', 'id', 'price', 'media']);
        yield put({type: ACTION.TEMP_CONTEST, data: {...dataToSend, ...newProps}});
        yield put({type: ACTION.CHANGE_APP_STATE, data: {'userContests': true}})
    } else {
        let FinalDataToSend = preparingDataToSend(dataToSend);
        const {data} = yield createContest(FinalDataToSend, id);
        const newProps = _.pick(data.contest, ['status', 'id', 'price', 'media']);
        yield put({type: ACTION.TEMP_CONTEST, data: {...dataToSend, ...newProps}});
        yield put({type: ACTION.CHANGE_APP_STATE, data: {'userContests': true}})
    }

}

export function* receiveUserContests({dataToSend}) {
    const {data} = yield getUserContests(dataToSend);
    let numberInDraft = 0, numberInLaunch = 0, InDraft = [], InLaunch = [], latestNotPaymentContest = '0',
        latestContest = 0;
    data.map((item) => {
        if (item['status'] === 'Not Paid') {
            if (item['updatedAt'] > latestNotPaymentContest) {
                latestNotPaymentContest = item['updatedAt'];
                latestContest = item
            }
            numberInDraft++;
            InDraft.push(item);
        } else {
            numberInLaunch++;
            InLaunch.push(item);
        }
    });
    yield put({
        type: ACTION.SET_USER_CONTESTS,
        data,
        numberInLaunch: numberInLaunch,
        numberInDraft: numberInDraft,
        InLaunch: InLaunch,
        InDraft: InDraft,
        latestContest: latestContest
    });
}

export function* deleteUserContest({dataToSend}) {

    const {idContest, idUser} = dataToSend;

    const {data} = yield deleteContest(idContest, idUser);
    if (data) {
        yield put({type: ACTION.CHANGE_APP_STATE, data: {'userContests': true}})
    }

}