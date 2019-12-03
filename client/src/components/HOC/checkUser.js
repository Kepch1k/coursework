import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {TOKENS_KEY} from '../../constants/consts';
import {
    changeAppStatus,
    changeUserPassword,
    noUser,
    resetApiMsg,
    resetAppMsg,
    userIsLogin
} from '../../actions/actionCreator';
import {toast} from "react-toastify";
import Modal from 'react-modal';
import style from "../LoginAndSignUp/MainLogin/ContainerBody/Form/Form.module.scss";
import ReserPassword from "../ModalForm/ReserPassword";

const customStyles = {
    content: {
        zIndex: 20,
    }
};
Modal.setAppElement('#root');

class UserLoader extends Component {

    notify = (msg) => {
        const props = {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 6000,
        };
        if (this.props.app.msg) {
            this.props.resetAppMsg();
            if (this.props.app.error) {
                return toast.error(msg, props)
            } else {
                return toast.success(msg, props)
            }
        } else if (this.props.mail.msg) {
            this.props.resetApiMsg();
            if (this.props.mail.err) {
                return toast.error(msg, props)
            } else {
                return toast.success(msg, props)
            }
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
                <Modal
                    isOpen={this.props.modal.resetPassword}
                    onAfterOpen={() => {
                    }}
                    onRequestClose={() => {
                    }}
                    style={customStyles}
                    className={style.modal}
                    overlayClassName={style.modalOverlay}
                >

                    <ReserPassword createAction={this.props.changeUserPassword} title={'Change Password'}
                                   preInput={'Enter and retype the new password'}
                                   button={'Click to change'} email={this.props.mail['email']}/>
                </Modal>

                {this.props.children}
            </>
        )
    }

    componentDidUpdate() {
        if (this.props.mail.msg) {
            this.notify(this.props.mail.msg)
        }
        if (this.props.app.msg) {
            this.notify(this.props.app.msg)
        }
        if (this.props.app.needUpdate['user']) {
            this.props.userIsLogin();
            this.props.changeAppStatus({'user': false});
        }

    }

    componentDidMount() {
        if (this.props.mail.msg) {
            this.notify(this.props.mail.msg)
        }
        if (this.props.app.msg) {
            this.notify(this.props.app.msg)
        }
        if (this.props.app.needUpdate['user']) {
            this.props.userIsLogin();
            this.props.changeAppStatus({'user': false});
        }

    }
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
    mail: state.mailServiceReducers,
    pageToRedirect: state.siteNavigationReducers.pageToRedirect,
    modal: state.modalReducers,
    app: state.AppReducers,
});
const mapDispatchToProps = (dispatch) => ({
    userIsLogin: () => dispatch(userIsLogin()),
    resetApiMsg: () => dispatch(resetApiMsg()),
    resetAppMsg: () => dispatch(resetAppMsg()),

    changeUserPassword: (value) => dispatch(changeUserPassword(value)),
    changeAppStatus: (value) => dispatch(changeAppStatus(value)),
    noUser: () => dispatch(noUser()),


});
export default connect(mapStateToProps, mapDispatchToProps)(UserLoader);
