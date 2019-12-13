import ACTION from './actiontsTypes';
//--------------------------------------------
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

export const noUser = () => {
    return ({
        type: ACTION.NO_USER,
    })
};

export const showingOrHidingNavigation = ({show}) => {
    console.log("show1:",show);
    return ({
        type: ACTION.SHOW_OR_HIDE_NAVIGATION,
        show:show,
    })
};

export const writeHtml = (data) => {
    return ({
        type: ACTION.WRITE_HTML_PARAMETERS_FOR_ANIMATION,
        dataForAnimation:data,
    })
};

export const changeCurrentTags = (data) => {
    return ({
        type: ACTION.CHANGE_CURRENT_TAGS,
        listOfTags:data,
    })
};

export const addCommonNotification = (data) => {
    return ({
        type: ACTION.ADD_COMMON_NOTIFICATION,
        message:data,
    })
};

export const deleteCommonNotification = (data) => {
    return ({
        type: ACTION.DELETE_COMMON_NOTIFICATION,
        message:data,
    })
};

export const addSpecialNotification = (data) => {
    return ({
        type: ACTION.ADD_SPECIAL_NOTIFICATION,
        message:data,
    })
};

export const deleteSpecialNotification = (data) => {
    return ({
        type: ACTION.DELETE_SPECIAL_NOTIFICATION,
        message:data,
    })
};

export const setCurrentNote = (data) => {
    return ({
        type: ACTION.SET_CURRENT_NOTE_TEXT,
        note:data,
    })
};

export const saveNote = (data) => {
    return ({
        type: ACTION.SAVE_NOTE,
        note:data,
    })
};

export const updateNote = (data) => {
    return ({
        type: ACTION.UPDATE_NOTE,
        note:data,
    })
};

export const deleteNote = (data) => {
    return ({
        type: ACTION.DELETE_NOTE,
        note:data,
    })
};

