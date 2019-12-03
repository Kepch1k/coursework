import React from 'react';
import style from './DashboardBanner.module.scss';
import connect from 'react-redux/es/connect/connect';

function dashboardBanner(props) {
    return (
        <div className={style.preBlueBanner}>
            <div className={style.blueBanner}>
                <div className={style.dashboardAva}
                     style={{backgroundImage: "url(http://www.simonhoegsberg.com/faces_of_new_york/images/11_faces.jpg)"}}>
                    <div className={style.upload}><i className="fa fa-camera"/>
                        <div className={style.uploadFile}>Upload Picture</div>
                    </div>


                </div>
                <div className={style.textBlock}>
                    <div className={style.rowName}>
                        {(props.user) ? props.user.displayName : ""}
                    </div>
                    <div className={style.rowEmail}>
                        {(props.user) ? props.user.email : ""}
                    </div>
                </div>
            </div>
        </div>);
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    };
};
export default connect(mapStateToProps)(dashboardBanner);