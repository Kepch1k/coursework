import React, {useState} from 'react';
import style from './Login.module.scss';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import {logout, setSiteNavigation} from '../../../../../../actions/actionCreator';
import history from '../../../../../../boot/browserHistory';

function Login(props) {

    const [dashboardView, setDashboardView] = useState(false);
    const toRedirect = history.location.pathname;

    function onClicked() {
        props.logout();
        setDashboardView(!dashboardView);
    }

    function onClickedDashboard() {
        setDashboardView(!dashboardView);
    }

    const AdminP = (props.state.userReducers.user && props.state.userReducers.user.role === "ADMIN") ?
        <Link to="/admin_panel/">
            <li>Admin panel</li>
        </Link> : <></>;
    const list = dashboardView && <div className={style.dashboard}>
        <ul className={style.dashboardList}>
            <Link to="/dashboard/">
                <li>View Dashboard</li>
            </Link>
            <li>My account</li>
            <li>Messages</li>
            {AdminP}
            <li>Affiliate Dashboard</li>
            <li onClick={onClicked}>Logout</li>
        </ul>
    </div>;
    const content = (!props.state.userReducers.user) ?
        <Link to="/login" onClick={() => props.setSiteNavigation({pageToRedirect: toRedirect})}>Login</Link> :
        <span className={style.toClick} onClick={onClickedDashboard}>
          <div className={style.ava}/>
        <span className={style.hi}>&nbsp; Hi, {props.state.userReducers.user.displayName}&nbsp;
            {
                (dashboardView) ?
                    <i className="fa fa-angle-up"/>
                    :
                    <i className="fa fa-angle-down"/>
            }
        </span>
        </span>
    ;
    return (
        <div className={style.flax}>
            <div className={style.main}>
                {content}
            </div>
            {list}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state
    };
};
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    setSiteNavigation: (data) => dispatch(setSiteNavigation(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
