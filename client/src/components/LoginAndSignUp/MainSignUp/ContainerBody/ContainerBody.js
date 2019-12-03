import React from 'react';
import style from './ContainerBody.module.scss';
import Form from './Form/Form';
import connect from 'react-redux/es/connect/connect';


function ContainerBody(props) {


    return (
        <div className={style.main}>
            <div className={style.title}><h2>CREATE AN ACCOUNT</h2></div>
            <div className={style.subTitle}><h4>We always keep your name and email address private.</h4></div>
            <div className={style.mainForm}>
                <Form/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state,
        fromStore: state.userReducers.data,
    };
};

export default connect(mapStateToProps)(ContainerBody);

