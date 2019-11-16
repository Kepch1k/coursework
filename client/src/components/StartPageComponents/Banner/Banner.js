import React, {useEffect, useState} from 'react';
import style from './Banner.module.scss';
import {Link} from 'react-router-dom';
import {LOADING_ITEMS, startValueContestProgressing} from '../../../constants/consts';
import {contestProgressing, selectedContestType} from "../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";

let number = 0;


function Banner(props) {
    function onClickedStartContest() {
        props.contestProgressing(startValueContestProgressing, null);
        props.selectedContestType([]);
    }

    const [text, setText] = useState(null);
    useEffect(() => {
        const timeout = setInterval(() => {
            if (number === (LOADING_ITEMS.length)) {
                number = 0;
                setText(LOADING_ITEMS[number]);
                number++;
            } else {
                setText(LOADING_ITEMS[number]);
                number++;
            }
        }, 3000);
        return () => clearInterval(timeout);
    });

    return (
        <div className={style.banner}>
            <div className={style.bannerContent}>
                <div className={style.loadingBar}>
                    <div>Find the Perfect Name for&nbsp;</div>
                    <div className={style.flexForLoading}>
                        <span className={style.loading}>{(text !== null) ? text : LOADING_ITEMS[8]}</span>
                    </div>
                </div>
                <p>Launch a naming contest to engage hundreds of naming experts as you’re guided through our
                    agency-level naming process.<br/>
                    Or, explore our hand-picked collection of premium names available for immediate purchase.</p>
                <div className={style.flexList}>
                    <div className={style.item}>
                        <div className={style.itemIntermediateLayer}>
                            <Link to="/contest_creating_choose_type/">
                                <div className={style.startContestButton} onClick={onClickedStartContest}>
                                    START A CONTEST
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={style.textOr}>
                        Or
                    </div>
                    <div className={style.item}>
                        <div className={style.itemIntermediateLayer}>
                            <Link to="/ss">
                                <div className={style.exploreButton}>
                                    Explore Names For Sale
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        state,
        types: state.contestReducers.selectedContestTypes
    };
};
const mapDispatchToProps = (dispatch) => ({
    selectedContestType: (contestTypes) => dispatch(selectedContestType(contestTypes)),
    contestProgressing: (firstValue, secondValue) => dispatch(contestProgressing(firstValue, secondValue)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Banner);

