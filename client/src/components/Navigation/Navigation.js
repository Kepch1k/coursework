import React,{useState,useEffect} from 'react';
import style from './Navigation.module.scss';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import {showingOrHidingNavigation,writeHtml,doReAnimation,logout} from "../../actions/actionCreator";
import siteFooter from '../../functionsForAnimation/navigation/setSiteFooter';
import deepEqual from '../../functionsForAnimation/navigation/deepEqual';
import onResizeWindow from '../../functionsForAnimation/navigation/onResizeWindow';
import checkNeedReAnimation from '../../functionsForAnimation/navigation/checkNeedReAnimation';
import LoginOrRegister from '../Login/LoginOrRegister';
import history from "../../boot/browserHistory";

function Navigation(props) {

    const [isHistoryListenCalled, setIsHistoryListenCalled] = useState(
        false
    );

    const [isLogin, setIsLogin] = useState(
        props.user
    );


    const [needReAnimation, setNeedReAnimation] = useState(
        false
    );
//-----------------------------------
    if(!isHistoryListenCalled){
        setIsHistoryListenCalled(true);
        history.listen(_ => {
            props.doReAnimation(true);
        });
    }

   // console.log(props.Nav.reAnimation);

    if(checkNeedReAnimation()){
        //console.log("onResize    outside");
        setTimeout(()=>{

            onResize();

        //console.log("onResize    ")
        },400);
    }else{
         setTimeout(()=>{

            if(props.Nav.reAnimation!==false){
                props.doReAnimation(false);
            }
            },0);
    }

   // console.log("render");
   // console.log("props.Nav.reAnimation",props.Nav.reAnimation);

    //-----------------------------
    //
    // if(props.Nav.reAnimation){
    //     props.doReAnimation(false);
    //     console.log("setNeedReAnimation TRUE");
    //     setTimeout(()=>{setNeedReAnimation(true);},0);
    // }

    // if(needReAnimation){
    //     setTimeout(()=>{
    //         const mainPiece = document.getElementById("mainPiece");
    //         const navigationWidth = document.getElementById("navigation").offsetWidth;
    //         const screenWidth = window.innerWidth;
    //         if(mainPiece.offsetWidth===(screenWidth - navigationWidth)){
    //             setNeedReAnimation(false);
    //         }else{
    //             onResizeWindow();
    //         }
    //     },0)
    //
    // }

    if(!deepEqual(isLogin,props.user)) {
        setIsLogin(props.user);
        setTimeout(()=>{props.doReAnimation(true);},0);
    }
    //console.log(props.user);

     // if(!deepEqual(isLogin,props.user)){
     //     setIsLogin(props.user);
     //     setNeedReAnimation(true);
     //   //   const id = setInterval(()=>{
     //   //       onResizeWindow();
     //   //
     //   //   },500);
     //   // setTimeout(()=>{clearInterval(id)},10000);
     // }

    document.ready=()=>{
        props.writeHtml({
            navigation:document.getElementById("navigation").offsetWidth,
            controller:document.getElementById("controller").offsetWidth,
        });
        const mainPiece = document.getElementById("mainPiece");
        mainPiece.style.width=mainPiece.offsetWidth+"px";
    };

    function onResize() {
        if(document.getElementById("navigation")&&document.getElementById("controller")){
                    props.writeHtml({
                        navigation: document.getElementById("navigation").offsetWidth,
                        controller: document.getElementById("controller").offsetWidth,
                    });
                onResizeWindow();
        }
    }

    function resize() {

        if(document.getElementById("navigation")&&document.getElementById("controller")){
            if(
                (props.Nav.parameters)
            ) {
                    props.writeHtml({
                        navigation:document.getElementById("navigation").offsetWidth,
                        controller:document.getElementById("controller").offsetWidth,
                    });
                    const navigationWidth = props.Nav.parameters.navigation;
                    const controllerWidth = props.Nav.parameters.controller;
                    const mainPiece = document.getElementById("mainPiece");
                    const newNavigationWidth = (props.Nav.show)?(controllerWidth):(navigationWidth);
                    const screenWidth = window.innerWidth;
                    mainPiece.style.width=(screenWidth-newNavigationWidth)+"px";
                    siteFooter();
            }
        }

    }

    window.onload=()=>{
        props.writeHtml({
            navigation:document.getElementById("navigation").offsetWidth,
            controller:document.getElementById("controller").offsetWidth,
        });
        onResizeWindow();
    };

    window.onresize=()=>{
        onResize();
    };

    const [user, setUser] = useState({
        nickName:"Пользователь",
        lvl:{
            currentLvl:10,
            currentXP:0,
            neededXP:10,
        }
    });

    const [accountMenu, setAccountMenu] = useState([
        {
            ru:"Мои записи",
            numberOfNewSmth:null    ,
        },
        {
            ru:"Сообщения",
            numberOfNewSmth:1,
        },
        {
            ru:"События",
            numberOfNewSmth:2,
        },
        {
            ru:"Достижения",
            numberOfNewSmth:1,
        },
        {
            ru:"Задания",
            numberOfNewSmth:1,
        },
        {
            ru:"Настройки Аккаунта",
            numberOfNewSmth:null,
        },
        {
            ru:"Статистика",
            numberOfNewSmth:null,
        },
        {
            ru:"Выход из аккаунта",
            numberOfNewSmth:null,
        },
    ]);

    // const [colorOfProgress, setColorOfProgress] = useState("#00b400");
    // const [showNavigation, setShowNavigation] = useState(true);
    // const screenWidth = window.innerWidth;
    // const screenHeight = window.innerHeight;
    // const sizeOfLvlBar= Math.round((screenWidth/8));
    // let currentLvlSize = Math.round(((user.lvl.currentXP/user.lvl.neededXP)*sizeOfLvlBar));


    const accountMenuToRender = accountMenu.map((el,index,array)=>{
        const lastElement=((index + 1) === array.length)?style.lastElement:"";
        let link;
        switch (el.ru) {
            case "Мои записи":link ="/";break;
            case "Выход из аккаунта":link ="/";break;
            default :link ="/gg/";
        }
       return  <Link to={link} key={index}><div className={`${style.itemOfList} ${lastElement}`} onClick={(el.ru==="Выход из аккаунта")?()=>{props.logout();console.log("logout");}:()=>{}}>
           <div className={`${style.contain}`}>
               {el.ru}
           </div>
           {(el.numberOfNewSmth>0)?<div className={`${style.numberOfNewSmth}`}>
               {el.numberOfNewSmth}
           </div>:<></>}
       </div>
       </Link>
    });
    return (
    /*(
        <nav className={`${style.navigation}`}>
            <div>
            <div className={`${style.user}`}>
                <div className={`${style.avatar}`}
                     style={{backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dzLRAcc6JUNMvBzU1F5dI6rCLmqumRn2RTaVWN2RQvHMFxYaLQ&s)"}}
                     onClick={()=>{
                         setUser({...user,
                            lvl:{...user.lvl,
                                currentXP: 10
                            }
                         });
                         setColorOfProgress("#cfd008");
                         setTimeout(()=>{
                             setColorOfProgress("#00b400");
                         },2000)
                     }}
                />
                <div className={`${style.name}`}>{user.nickName}</div>
                <div className={`${style.lvl}`} style={{width:sizeOfLvlBar+"px"}}>
                    <div className={`${style.progress}`} style={{width:currentLvlSize+"px", background:colorOfProgress}}/>
                    <div className={`${style.lvlInfo}`}>{user.lvl.currentLvl} LVL</div>
                </div>
            </div>
            <ul className={`${style.listOfFeatures}`}>
                <li>Профиль</li>
                <li>Мои заметки</li>
                <li>Задания</li>
                <li>Почта</li>
            </ul>
            </div>
            <div className={`${style.support}`}>
                Помощь
            </div>
        </nav>
        );*/

//  {(!!props.user)?<div className={`${style.forLocation}`} style={{width:(props.Nav.show)?"300px":"0",marginLeft:(props.Nav.show)?"20px":"0"}}>

// {(!!props.user)?<div className={`${style.forLocation}`}
//                      style={{width:(props.Nav.show)?`${((props.Nav.parameters.navigation-props.Nav.parameters.controller)-((props.Nav.show)?20:0))}px`:"0",marginLeft:(props.Nav.show)?"20px":"0"}}>
        <nav className={`${style.navigation}`} id={"navigation"}>
            {(!!props.user)?<div className={`${style.forLocation}`} style={{width:(props.Nav.show)?"300px":"0px",marginLeft:(props.Nav.show)?"20px":"0px"}} id={"forLocation"}>
                <div className={`${style.accountProfile}`} >
                    <div className={`${style.avatar}`} style={{backgroundImage:"url(http://gimnazija.com.ua/wp-content/uploads/2017/03/no-avatar-300x300.png)"}}/>
                    <div className={`${style.info}`}>
                        {props.user.displayName||user.nickName}
                    </div>
                    <div className={`${style.subInfo}`}>
                        <div className={`${style.preLine}`}>
                            <div className={`${style.likes}`}>

                            </div>
                            <div className={`${style.center} ${style.views}`}>

                            </div>
                            <div className={`${style.rating}`}>

                            </div>
                        </div>
                        <div className={`${style.contain}`}>
                            <div className={`${style.field}`}>
                                <i className="fas fa-heart"/>11
                            </div>
                            <div className={`${style.center} ${style.field}`}>
                                <i className="fas fa-eye"/>22
                            </div>
                            <div className={`${style.field}`}>
                                <i className="fas fa-star-half-alt"/>3
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.accountMenu}`} >
                    <div className={`${style.title}`}>
                        Меню аккаунта
                    </div>
                    {accountMenuToRender}
                </div>

            </div>
                :
                <div className={`${style.login_register}`} style={{width:(props.Nav.show)?"400px":"0",marginLeft:(props.Nav.show)?"20px":"0"}}>
                <LoginOrRegister/>
            </div>}


            <div className={style.controller} id={"controller"}  onClick={()=>{
                resize();
                props.showingOrHidingNavigation({show:!props.Nav.show});

            }}>
                {(props.Nav.show)?<i className="fas fa-angle-double-left"/>:<i className="fas fa-angle-double-right"/>}</div>
        </nav>
    );
}


const mapStateToProps = (state) => {
    return {
        Nav:state.UI_Elements.Nav,
        user: state.userReducers.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    showingOrHidingNavigation: (data) => dispatch(showingOrHidingNavigation(data)),
    writeHtml: (data) => dispatch(writeHtml(data)),
    doReAnimation: (data) => dispatch(doReAnimation(data)),
    logout: () => dispatch(logout()),


});

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);