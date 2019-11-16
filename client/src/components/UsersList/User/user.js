import React from 'react';
import style from './user.module.scss';

function User(props) {
    const Color = props.isBanned ? "red" : "green";
    const status = props.isBanned ? <i className="fa fa-ban" aria-hidden="true"/> :
        <i className="fas fa-check-circle"/>;
    return (
        <div className={style.list}>
            <div className={style.listLeft}>
                <div className={style.avatar} style={{backgroundImage: "url(" + props.img + ")"}}/>
                <div className={style.boxForNameAndLvl}>
                    <div className={style.name}>
                        {props.name}
                    </div>
                    <div className={style.level}>
                        {props.displayName}
                    </div>
                    <div className={style.position}>
                        role: {props.role}
                    </div>
                </div>
            </div>
            <div onClick={() => props.click(props.id, props.isBanned)}
                 style={{color: Color}}
                 className={style.icon}>
                {status}
            </div>
        </div>);
}

export default User;