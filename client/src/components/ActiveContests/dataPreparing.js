import {restURL} from "../../api/baseURL";

const _ = require('lodash');
const {FILTER_TAGS} = require('../../constants/consts');

const prepareData = (data) => {
    const dataToPrepare = _.cloneDeep(data);
    dataToPrepare['status'] = [];
    dataToPrepare['price'] = [];
    if (dataToPrepare['$33-$99'] === true) {

        dataToPrepare['price'].push('$33-$99');

    }
    if (dataToPrepare['$100-$199'] === true) {

        dataToPrepare['price'].push('$100-$199');

    }
    if (dataToPrepare['>$200'] === true) {

        dataToPrepare['price'].push('>$200');

    }

    if (dataToPrepare['Active'] === true) {

        dataToPrepare['status'].push('Active');

    }
    if (dataToPrepare['Closed'] === true) {

        dataToPrepare['status'].push('Closed');

    }
    if (dataToPrepare['Pending'] === true) {

        dataToPrepare['status'].push('Pending');

    }

    if (_.isEmpty(dataToPrepare['status'])) {
        delete dataToPrepare['status']
    }
    if (_.isEmpty(dataToPrepare['price'])) {
        delete dataToPrepare['price']
    }

    for (let key in dataToPrepare) {
        if (dataToPrepare.hasOwnProperty(key)) {
            if (FILTER_TAGS['label'].includes(key)) {
                dataToPrepare[FILTER_TAGS['originalName'][key]] = dataToPrepare[key];
            }
        }
    }

    const NeededFields = _.pick(dataToPrepare, FILTER_TAGS['toSend']);

    const contestFilter = {};
    for (let key in NeededFields) {
        if (NeededFields.hasOwnProperty(key)) {
            if (NeededFields[key].hasOwnProperty('value')) {
                if (FILTER_TAGS['categoriesAssociation'].hasOwnProperty(NeededFields[key]['value'])) {
                    contestFilter[key] = FILTER_TAGS['categoriesAssociation'][NeededFields[key]['value']];
                } else {
                    contestFilter[key] = NeededFields[key]['value'];
                }

            } else {
                contestFilter[key] = NeededFields[key];
            }
        }
    }
    const dataOnServer = _.cloneDeep(contestFilter);

    for (let key in dataOnServer) {
        if (dataOnServer.hasOwnProperty(key)) {

            if (_.isString(dataOnServer[key]) && (key !== 'id')) {

                dataOnServer[key] = dataOnServer[key].replace(/ /g, '_').replace(/&/g, 'and');

            }
        }
    }

    if (dataOnServer['typeOfIndustry'] === "All_Industries") {
        delete dataOnServer['typeOfIndustry']
    }
    if (dataOnServer['typeOfContest'] === "All_Categories") {
        delete dataOnServer['typeOfContest']
    }

    let url = `${restURL}/contestFilter/?`;
    for (let key in dataOnServer) {
        if (dataOnServer.hasOwnProperty(key)) {
            if (url === `${restURL}/contestFilter/?`) {
                url = `${url}${key}=${dataOnServer[key]}`
            } else {
                url = `${url}&${key}=${dataOnServer[key]}`
            }
        }
    }

    return url

};
export default prepareData;