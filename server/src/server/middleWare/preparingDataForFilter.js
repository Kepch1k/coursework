const {
    FILTER_TAGS,
    FILTER_TAGS_IN_NEED_CHANGED
} = require('../utils/Consts');
const _ = require('lodash');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const getPriceFilter = (filterItem) => {
    if (filterItem.indexOf('>') !== -1) {
        const filterValue = filterItem.replace(/>/g, '');
        return {[Op.gt]: filterValue};
    } else {
        const filterValue = filterItem.split('-');
        return {[Op.between]: filterValue};
    }
};
const reducer = (accumulator, currentValue, index, array) => {
    if (index === array.length - 1) {
        if (!accumulator[Op.or]) {
            accumulator = getPriceFilter(currentValue);

            return accumulator
        } else {
            const value = getPriceFilter(currentValue);

            accumulator[Op.or].push(value);

            return accumulator;
        }
    } else {
        if (!accumulator[Op.or]) {
            accumulator[Op.or] = [];

        }
        const value = getPriceFilter(currentValue);

        accumulator[Op.or].push(value);

        return accumulator;
    }
};

module.exports.prepare = async (req, res, next) => {
    try {
              const {query} = req;
        const contestFilter = _.pick(query, FILTER_TAGS);
        if (contestFilter['status']) {
            if (contestFilter['status'].indexOf(',') !== -1) {
                contestFilter['status'] = contestFilter['status'].split(',');
            } else {
                contestFilter['status'] = [contestFilter['status']];
            }
        }
        if (contestFilter['price']) {
            contestFilter['price'] = contestFilter['price'].replace(/\$/g, '');
            if (contestFilter['price'].indexOf(',') !== -1) {

                contestFilter['price'] = contestFilter['price'].split(',');

            } else {

                contestFilter['price'] = [contestFilter['price']];
            }

            contestFilter['price'] = contestFilter['price'].reduce(reducer, {});


        }
        for (let key in contestFilter) {
            if (contestFilter.hasOwnProperty(key) && (key !== "typeOfContest")) {
                if (FILTER_TAGS_IN_NEED_CHANGED.includes(key)) {
                    contestFilter[key] = [contestFilter[key].replace(/and/g, '&').replace(/_/g, ' ')];
                }
            }
        }
        if (contestFilter['status']) {
            contestFilter['status'] = {[Op.in]: contestFilter['status'], [Op.notIn]: ['Not Paid']};
        } else {
            contestFilter['status'] = {[Op.notIn]: ['Not Paid']};
        }


        req.contestFilter = contestFilter;
        next();
    } catch (e) {
        console.log("Error in middle", e)
        next({status: 404, message: 'User not founds'});
    }
};

