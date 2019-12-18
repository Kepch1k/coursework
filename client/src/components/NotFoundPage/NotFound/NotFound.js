import React,{useState,useEffect} from 'react';
import style from './NotFound.module.scss';
import history from '../../../boot/browserHistory';
import connect from 'react-redux/es/connect/connect';
import {doReAnimation, showingOrHidingNavigation, writeHtml} from "../../../actions/actionCreator";
import animationHandler from "../../../functionsForAnimation/notFound/animationHandler";
import asyncAnimationHandler from "../../../functionsForAnimation/notFound/asyncAnimationHandler";

function NotFound(props) {
    const [isHistoryListenCalled, setIsHistoryListenCalled] = useState(
        false
    );
    const [urlCurrentPage, setUrlCurrentPage] = useState(
        history.location.pathname
    );

    useEffect(() => {
        window.addEventListener("load",animationHandler);
        window.addEventListener("resize",animationHandler);
        window.addEventListener("load",asyncAnimationHandler);
        return ()=>{
        window.removeEventListener("load",animationHandler);
        window.removeEventListener("resize",animationHandler);
        window.removeEventListener("load",asyncAnimationHandler);
        }
    });

    if(!isHistoryListenCalled){
        setIsHistoryListenCalled(true);
        history.listen(_ => {
            props.doReAnimation(true);
        });
    }

    if(props.Nav.reAnimation && (urlCurrentPage===history.location.pathname)){
        setTimeout(()=>{
            animationHandler();
            asyncAnimationHandler();
            props.doReAnimation(false);
        },0);

    }



    // const causeRepaintsOn = document.querySelectorAll("h1, h2, h3, p");
    // window.onresize=()=>{
    //     for(let elem of causeRepaintsOn){
    //         elem.style.zIndex=1;
    //     }
    // };

    return (
    <div id={`${style.notFound}`}>
        <div id={`${style.wrap}`}>
            <div id={`${style.wordsearch}`}>
                <ul>
                    <li>k</li>

                    <li>v</li>

                    <li>n</li>

                    <li>z</li>

                    <li>i</li>

                    <li>x</li>

                    <li>m</li>

                    <li>e</li>

                    <li>t</li>

                    <li>a</li>

                    <li>x</li>

                    <li>l</li>

                    <li className="one">4</li>

                    <li className="two">0</li>

                    <li className="three">4</li>

                    <li>y</li>

                    <li>y</li>

                    <li>w</li>

                    <li>v</li>

                    <li>b</li>

                    <li>o</li>

                    <li>q</li>

                    <li>d</li>

                    <li>y</li>

                    <li>p</li>

                    <li>a</li>

                    <li className="four">p</li>

                    <li className="five">a</li>

                    <li className="six">g</li>

                    <li className="seven">e</li>

                    <li>v</li>

                    <li>j</li>

                    <li>a</li>

                    <li className="eight">n</li>

                    <li className="nine">o</li>

                    <li className="ten">t</li>

                    <li>s</li>

                    <li>c</li>

                    <li>e</li>

                    <li>w</li>

                    <li>v</li>

                    <li>x</li>

                    <li>e</li>

                    <li>p</li>

                    <li>c</li>

                    <li>f</li>

                    <li>h</li>

                    <li>q</li>

                    <li>e</li>

                    <li className="eleven">f</li>

                    <li className="twelve">o</li>

                    <li className="thirteen">u</li>

                    <li className="fourteen">n</li>

                    <li className="fifteen">d</li>

                    <li>s</li>

                    <li>w</li>

                    <li>q</li>

                    <li>v</li>

                    <li>o</li>

                    <li>s</li>

                    <li>m</li>

                    <li>v</li>

                    <li>f</li>

                    <li>u</li>
                </ul>
            </div>

            <div id={`${style["main-content"]}`}>
                {/*<h1>We couldn't find what you were looking for.</h1>*/}
                <h1> Мы не смогли найти то, что вы искали.</h1>

                {/*<p>Unfortunately the page you were looking for could not be found. It may be*/}
                {/*    temporarily unavailable, moved or no longer exist.</p>*/}

                {/*<p>Check the URL you entered for any mistakes and try again. Alternatively, search*/}
                {/*    for whatever is missing or take a look around the rest of our site.</p>*/}


                <p>К сожалению, страницу, которую вы искали, не удалось найти. Страница может быть временно недоступно, перемещено или больше не существует.</p>

                <p>Проверьте введенный вами URL на наличие ошибок и повторите попытку.</p>

                {/*<div id={`${style["search"]}`}>*/}
                {/*    <form>*/}
                {/*        <input type="text" placeholder="Search"/>*/}
                {/*    </form>*/}
                {/*</div>*/}

                <div id={`${style["navigation"]}`}>
                    <a className={`${style["navigation"]}`} href="" onClick={(e)=>{
                        e.preventDefault();
                        history.push("/");
                    }}>На главную</a>
                    <a className={`${style["navigation"]}`} href="" onClick={(e)=>{
                        e.preventDefault();
                        history.goBack();
                    }}>Назад</a>
                    {/*<a className={`${style[""]}`} href="">Site Map</a>*/}
                    {/*<a className={`${style["navigation"]}`} href=*/}
                    {/*    "">Contact</a>*/}
                </div>
            </div>
        </div>
    </div>
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
});

export default connect(mapStateToProps,mapDispatchToProps)(NotFound);
