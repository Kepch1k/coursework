const moment = require('moment');
const _ = require("lodash");

const time = (contestTime) => {
    const dateUpdate = _.cloneDeep(contestTime);
    const YYYY = parseInt(dateUpdate.slice(0, 4));
    const MM = parseInt(dateUpdate.slice(5, 7)) - 1;
    const DD = parseInt(dateUpdate.slice(8, 10));
    const HH = parseInt(dateUpdate.slice(11, 13));
    const mm = parseInt(dateUpdate.slice(14, 16));
    const date = new Date(Date.now());
    const userTimezoneOffset = date.getTimezoneOffset();
    const DateNow = moment().add({'minute': userTimezoneOffset, 'second': 0, 'millisecond': 0});
    const updateDate = moment().set({
        'year': YYYY,
        'month': MM,
        'date': DD,
        'hour': HH,
        'minute': mm,
        'second': 0,
        'millisecond': 0
    });
    return moment.duration(moment(updateDate).diff(moment(DateNow)));
};

export default time;