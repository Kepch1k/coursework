import ACTION from './actiontsTypes';

const {
    ARRAY_OF_OPTIONS,
} = require('../constants/ContestsFormContet');
const _ = require("lodash");

export const createOrUpdateTempContest = (dataToSend) => {
    const cloneData = _.cloneDeep(dataToSend);

// TODO
    for (let key in cloneData) {
        if (cloneData.hasOwnProperty(key)) {
            for (let props in ARRAY_OF_OPTIONS) {
                if (ARRAY_OF_OPTIONS.hasOwnProperty(props)) {
                    if (props === key) {
                        let newFiled;
                        if (_.isArray(cloneData[key])) {
                            newFiled = cloneData[key].map((item) => {
                                return {label: item, value: item}
                            })
                        } else {
                            newFiled = {label: cloneData[key], value: cloneData[key]}
                        }
                        cloneData[key] = newFiled
                    }
                }
            }
        }
    }

    return ({
        type: ACTION.TEMP_CONTEST,
        data: cloneData
    })
};

export const resetTempContests = () => ({
    type: ACTION.RESET_TEMP_CONTEST,
});

export const userLogin = (dataToSend) => ({
    type: ACTION.USER_LOGIN,
    dataToSend,
});


export const userSignUp = (dataToSend) => ({
    type: ACTION.USER_SIGN_UP,
    dataToSend,
});

export const userIsLogin = () => ({
    type: ACTION.USER_IS_LOGIN,
});

export const getAllUsers = () => ({
    type: ACTION.GET_ALL_USERS,
});

export const userBaned = (id, banStatus) => ({
    type: ACTION.CHANGE_IS_BANED,
    id,
    banStatus
});

export const logout = () => ({
    type: ACTION.IS_LOGOUT,
});

export const selectedContestType = (contestTypes) => {
    return ({
        type: ACTION.SELECTED_CONTEST_TYPE,
        contestTypes
    })
};

export const contestProgressing = (stage, form) => {

    return ({
        type: ACTION.CONTEST_PROGRESSING,
        stage,
        form
    })
};

export const sendContest = (dataToSend, id) => {

    return ({
        type: ACTION.SEND_CONTEST,
        dataToSend,
        id
    })
};

export const sendCard = (dataToSend) => {

    return ({
        type: ACTION.SEND_CARD_REQUISITES,
        data: dataToSend
    })
};
export const checkEmail = (dataToSend) => {

    return ({
        type: ACTION.CHECK_USER_EMAIL,
        dataToSend
    })
};
export const sendApiFromEmail = (dataToSend) => {

    return ({
        type: ACTION.MAIL_SERVICE,
        dataToSend
    })
};
export const createLinkForMail = (dataToSend) => {

    return ({
        type: ACTION.CREATE_LINK_FOR_MAIL,
        dataToSend
    })
};
export const resetApiMsg = () => {
    return ({
        type: ACTION.RESET_API_MSG,
    })
};
export const resetAppMsg = () => {
    return ({
        type: ACTION.RESET_APP_MSG,
    })
};
export const setModalState = (data) => {
    return ({
        type: ACTION.MODAL_STATE,
        data
    })
};
export const setSiteNavigation = (data) => {
    return ({
        type: ACTION.SITE_NAVIGATION,
        data
    })
};
export const changeUserPassword = (dataToSend) => {
    return ({
        type: ACTION.CHANGE_USER_PASSWORD,
        dataToSend
    })
};
export const getUserContests = (dataToSend) => {

    return ({
        type: ACTION.GET_USER_CONTESTS,
        dataToSend
    })
};
export const resetCardResult = (data) => {

    return ({
        type: ACTION.RESET_CARD_RESULT,
    })
};
export const changeAppStatus = (data) => {

    return ({
        type: ACTION.CHANGE_APP_STATE,
        data
    })
};
export const noUser = () => {
    return ({
        type: ACTION.NO_USER,
    })
};
export const deleteContest = (idContest, idUser) => {
    return ({
        type: ACTION.DELETE_CONTEST,
        dataToSend: {
            'idContest': idContest,
            'idUser': idUser
        }
    })
};

export const changeFilterTags = (dataToSend) => {

    return ({
        type: ACTION.CHANGE_CONTEST_FILTER,
        dataToSend
    })
};

export const sendFilterData = (dataToSend) => {

    return ({
        type: ACTION.SEND_FILTER_DATA,
        dataToSend
    })
};

export const getContestByFilter = () => {
    return ({
        type: ACTION.GET_CONTESTS_BY_STARTER_FILTER
    })
};
export const getContestById = (id) => {
    return ({
        type: ACTION.CONTESTS_BY_ID_REQUEST,
        id
    })
};
export const sendEntry = (dataToSend) => {
    return ({
        type: ACTION.SEND_ENTRY,
        dataToSend
    })
};
export const entryManaged = (dataToSend) => {
    return ({
        type: ACTION.ENTRY_MANAGED,
        dataToSend
    })
};
export const newMessageToUser = ({msg, error}) => {
    return ({
        type: ACTION.NEW_MESSAGE,
        msg: msg,
        error: error
    })
};
