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


