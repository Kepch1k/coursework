const moment = require('moment');
const _ = require("lodash");

const getTime = (contestTime) => {
    const dateUpdate = _.cloneDeep(contestTime);
    const YYYY = parseInt(dateUpdate.slice(0, 4));
    const MM = parseInt(dateUpdate.slice(5, 7)) - 1;
    const DD = parseInt(dateUpdate.slice(8, 10));
    const HH = parseInt(dateUpdate.slice(11, 13));
    const mm = parseInt(dateUpdate.slice(14, 16));
    const ss = parseInt(dateUpdate.slice(17, 19));
    const date = new Date(Date.now());
    const userTimezoneOffset = date.getTimezoneOffset();
    const dataToReturn = moment().set({
        'year': YYYY,
        'month': MM,
        'date': DD,
        'hour': HH,
        'minute': mm,
        'second': ss,
        'millisecond': 0
    });
    dataToReturn.add({'minute': -userTimezoneOffset, 'second': 0, 'millisecond': 0});
    return dataToReturn;
};

export default getTime;