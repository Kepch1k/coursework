import React from 'react';
import style from './SignUp.module.scss';
import {Link} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import {setSiteNavigation} from "../../../../../../actions/actionCreator";
import history from '../../../../../../boot/browserHistory';

function SignUp(props) {
    const toRedirect = history.location.pathname;
    const content = (props.state.userReducers.user === null || props.state.userReducers.user === undefined) ?
        <Link className={style.anchor} onClick={() => props.setSiteNavigation({pageToRedirect: toRedirect})}
              to="/signup"> Sign up</Link> :
        <span>
        <span className={style.hi}><i className="far fa-envelope"/></span>
        </span>;

    return (
        <div className={style.main}>
            <div>
                {content}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => ({
    setSiteNavigation: (data) => dispatch(setSiteNavigation(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

