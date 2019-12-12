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
