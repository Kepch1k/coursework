import React from 'react';
import style from './ContainerHeader.module.scss';
import Logo from './Logo/Logo';
import Button from './Button/Button';

function Logotype(props) {
    return (
        <div className={style.mainContainerHeader}>
            <Logo/>
            <Button text={props.text} link={props.link}/>
        </div>
    );
}

export default Logotype;
