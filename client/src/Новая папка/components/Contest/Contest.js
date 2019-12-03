import React, {useState} from 'react';
import style from './Contest.module.scss';
import {FIELDS_NAME_HUMANIZE, NO_NEEDED_FIELDS} from '../../constants/consts';
import connect from "react-redux/es/connect/connect";
import timeAgo from '../../utils/timeAgo';
import {entryManaged, sendEntry} from '../../actions/actionCreator';
import FormForEntry from "./FormForEntry/FormForEntry";
import check from '../../utils/checkFile(s)Size';
import {SubmissionError} from "redux-form";
import {fileURL} from '../../api/baseURL';

const _ = require('lodash');

const contest = (props) => {
    const submit = (values) => {

        const errors = {};


        if (contest["typeOfContest"] === "LOGO") {
            if (_.isEmpty(values['logoEntry'])) {

                errors['logoEntry'] = "Required";
            } else {
                const resOfChecking = check(values['logoEntry'], 50);

                if (resOfChecking) {
                    errors['logoEntry'] = resOfChecking;
                }
            }
        } else {

            if (_.isEmpty(values)) {
                if (contest["typeOfContest"] === "NAME") {
                    errors.nameEntry = "Required";
                } else {
                    errors.taglineOrSloganEntry = "Required";
                }

            }
        }
        if (!_.isEmpty(errors)) {
            throw new SubmissionError({...errors})
        } else {
            if (contest["typeOfContest"] === "LOGO") {
                props.sendEntry({
                    id: contest.id,
                    type: contest["typeOfContest"],
                    file: _.values(values),
                    nickName: props.user.displayName
                });
            } else {
                props.sendEntry({
                    id: contest.id,
                    type: contest["typeOfContest"],
                    values: _.values(values),
                    nickName: props.user.displayName
                });
            }

            setEntryView(false);
        }

    };


    const [entryView, setEntryView] = useState(false);
    const [page, setPage] = useState(1);
    const {contest, entries} = props.contest;
    console.log(entries);
    const fieldsToRender = [];
    const entriesToRender = [];
    let duration;
    if (contest) {
        duration = timeAgo(contest.createdAt);
        const fieldsToShow = _.omit(contest, NO_NEEDED_FIELDS);

        for (let key in fieldsToShow) {
            if (fieldsToShow.hasOwnProperty(key)) {
                if (fieldsToShow[key]) {
                    let list = null;
                    if (_.isArray(fieldsToShow[key])) {
                        list = fieldsToShow[key].map((item) => {
                            if (key === "media") {

                                const fileName = item.split("_")[1];
                                const filePath = item.split("Upload/")[1];
                                return <li key={item}><a href={`${fileURL}/ContestUpload/${filePath}`}
                                                         download>{fileName}</a></li>

                            } else {

                                return <li key={item}>{item}</li>
                            }

                        })
                    }
                    fieldsToRender.push(<div key={key} className={style.field}>
                        <div className={style.title}>
                            {FIELDS_NAME_HUMANIZE[key]}
                        </div>
                        <div className={style.text}>
                            {(list) ?
                                <ol style={{listStyle: "decimal", paddingLeft: "25px"}}>{list}</ol> : fieldsToShow[key]}
                        </div>
                    </div>)
                }
            }
        }


        if (props.user.id === contest.userId) {
            if (entries) {
                entries.forEach((item) => {
                    let color = "black";
                    if (item.status === "ACCEPT") {
                        color = "green";
                    }
                    if (item.status === "REJECT") {
                        color = "red";
                    }
                    let entry;
                    if (item.prospectiveText) {
                        entry = item.prospectiveText;
                    } else {
                        const fileName = item.media.split("_")[1];
                        const filePath = item.media.split("Upload/")[1];
                        entry = <a href={`${fileURL}/EntriesUpload/${filePath}`} download>{fileName}</a>
                    }
                    entriesToRender.push(<div key={item.id} className={style.entryContainer}>
                        <div>Entry : {entry}</div>
                        <div className={style.nickName}>NickName : {item.nickName}</div>
                        <div className={style.nickName}>Status : <span
                            style={{color: color}}>{(item.status) ? item.status : null}</span></div>
                        {(item.status === "NEUTRAL") && <div className={style.buttonContainer}>
                            <div className={style.Accept}
                                 onClick={() => props.entryManaged({action: "ACCEPT", id: item.id})}>
                                Accept
                            </div>
                            <div className={style.Reject}
                                 onClick={() => props.entryManaged({action: "REJECT", id: item.id})}>
                                Reject
                            </div>
                        </div>}
                    </div>)
                })
            }
        }

    }
    if (props.contest) {

    }
    let button = null;
    if (props.user) {
        if (props.user.role === "Creative") {
            button = "Start Entry";
        }
    }
    return (<>
            {(contest) ? <div className={style.ContestMain}>
                <div className={style.banner}>
                    <div className={style.container}>
                        <div className={style.flexRowTitle}>
                            <div><i className="fas fa-flask flask-icon"/></div>
                            <div>{contest["titleOfContest"]}</div>
                        </div>
                    </div>
                </div>
                <div className={style.brief}>
                    <div className={`${style.container} ${style.flexRowBrief}`}>

                        <div className={`${style.container} ${style.contestContain}`}>
                            <div className={style.controller}>
                                <div className={style.pageController} onClick={() => setPage(1)}
                                     style={{background: (page === 1) ? "#337ab7" : "white"}}>Brief
                                </div>
                                {(props.user.id === contest.userId) &&
                                <div className={style.pageController} onClick={() => setPage(2)}
                                     style={{background: (page === 2) ? "#337ab7" : "white"}}>Entries</div>}
                            </div>
                            <div className={`${style.container} ${style.info}`}>
                                {(page === 1) && fieldsToRender}
                                {(page === 2) && entriesToRender}
                            </div>
                            {button && contest.status === "Active" && !contest.winner &&
                            <div className={style.startEntryBlock}>
                                <div className={style.startEntry}
                                     onClick={() => setEntryView(!entryView)}>{button}</div>
                            </div>}
                            {entryView && <FormForEntry type={contest["typeOfContest"]} onSubmit={submit}/>}
                        </div>

                        <div className={`${style.container} ${style.status}`}>
                            <div className={style.block}>

                                <div className={style.header}>
                                    <div><i className="far fa-gem"/></div>
                                    <div>&nbsp;&nbsp;${contest.price}</div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.entries}>
                                        <div><i className="fas fa-users"/> {contest['numberOfEntries']}</div>
                                        <span>Entries</span>
                                    </div>
                                    <span
                                        className={style.time}>{" "}Saved {(duration.humanize({precision: 4}).indexOf('ago') !== -1) ? duration.humanize({precision: 4}) : duration.humanize({precision: 4}) + "  ago"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> : null}</>
    );
};

const mapStateToProps = (state) => {
    return {
        contest: state.ContestReducer,
        user: state.userReducers.user
    };
};

const mapDispatchToProps = (dispatch) => ({
    sendEntry: (data) => dispatch(sendEntry(data)),
    entryManaged: (data) => dispatch(entryManaged(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(contest);
