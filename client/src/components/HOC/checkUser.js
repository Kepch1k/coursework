import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {TOKENS_KEY} from '../../constants/consts';
import {
    noUser,
    userIsLogin
} from '../../actions/actionCreator';

class UserLoader extends Component {

    componentWillMount() {
        console.log("check", localStorage.getItem(TOKENS_KEY));
        const user = this.props.user;
        if (!user && (localStorage.getItem(TOKENS_KEY) || sessionStorage.getItem(TOKENS_KEY))) {
            console.log("userIsLogin");
            this.props.userIsLogin();
        } else {
            console.log("noUser");
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
    }

    componentDidMount() {
        const user = this.props.user;
        console.log(user);
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
const mapDispatchToProps = (dispatch) => ({
    userIsLogin: () => dispatch(userIsLogin()),
    noUser: () => dispatch(noUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserLoader);
