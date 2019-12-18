import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {noteSave, noteUpdate, noteDelete} from '../api/rest/restContoller';

const _ = require('lodash');

export function* saveNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteSave(note);
        yield put({type: ACTION.ADD_NODE_TO_LIST, note:RES.data.note});
    } catch (e) {
    }
}


export function* updateNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteUpdate(note);
        console.log("RES RES RES:",RES.statusText);
        if(RES.statusText==="OK"){
            const noteTo = {};
            noteTo.contain=note.currentNote;
            noteTo.titleOfNote=note.title;
            noteTo.tags=note.tags;
            noteTo.id=note.id;
            console.log(noteTo);
            yield put({type: ACTION.UPDATE_NODE_IN_LIST, note:noteTo});
        }
    } catch (e) {
    }
}

export function* deleteNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteDelete(note);
        if(RES.statusText==="OK"){
            yield put({type: ACTION.DELETE_NODE_FROM_LIST, note:note});
        }
        console.log("RES",RES);
    } catch (e) {
    }
}

export function* createNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        yield put({type: ACTION.RESET_NOTE});
       // const RES = yield noteDelete(note);
    } catch (e) {
    }
}

export function* changeNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        console.log(note);
        const noteTo = _.pick(note,["tags","titleOfNote","contain"]);
        noteTo.currentNote=noteTo.contain;
        noteTo.state="updating";
        noteTo.id=note.id;
        delete noteTo.contain;
        console.log(noteTo);
        yield put({type: ACTION.SET_NOTE, note: noteTo});
    } catch (e) {
    }
}