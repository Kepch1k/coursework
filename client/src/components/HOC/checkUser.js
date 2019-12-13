import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {TOKENS_KEY} from '../../constants/consts';
import {
    noUser,
    userIsLogin,
    deleteCommonNotification,
    deleteSpecialNotification,
} from '../../actions/actionCreator';


import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

class UserLoader extends Component {

    notify = (msg) => {
        const props = {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: msg.timer,
        };
        return toast[msg.type](msg.text, props);
    };

    renderToast = () => {
        if(this.props.notification.common.messages.length>0){
            this.props.notification.common.messages.forEach((e)=>{
                if(e){
                    this.notify(e);
                    this.props.deleteCommonNotification(e);
                }

            });
        }
        if(this.props.notification.special.messages.length>0){
            this.props.notification.special.messages.forEach((e)=>{
                if(e){
                this.notify(e);
                    this.props.deleteSpecialNotification(e);
                }
            });
        }
    };

    componentWillMount() {
        const user = this.props.user;
        if (!user && (localStorage.getItem(TOKENS_KEY) || sessionStorage.getItem(TOKENS_KEY))) {
            this.props.userIsLogin();
        } else {
            this.props.noUser();
        }
    }


    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }

    componentDidUpdate() {
        this.renderToast();
    }

    componentDidMount() {
        //this.renderToast();
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    notification: state.Notification,
});

const mapDispatchToProps = (dispatch) => ({
    userIsLogin: () => dispatch(userIsLogin()),
    noUser: () => dispatch(noUser()),
    deleteCommonNotification: (data) => dispatch(deleteCommonNotification(data)),
    deleteSpecialNotification: (data) => dispatch(deleteSpecialNotification(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserLoader);
