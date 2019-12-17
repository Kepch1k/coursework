import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {noteSave, noteUpdate, noteDelete, getNote} from '../api/rest/restContoller';

const _ = require('lodash');

// login user
export function* saveNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteSave(note);
    } catch (e) {
    }
}

// yield put({type: ACTION.SET_USER, user: USER});
export function* updateNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteUpdate(note);
    } catch (e) {
    }
}

export function* deleteNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield noteDelete(note);
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
        const noteTo = _.pick(note,["tags","titleOfNote","contain"]);
        noteTo.currentNote=noteTo.contain;
        noteTo.state="updating";
        delete noteTo.contain;
        console.log(noteTo);
        yield put({type: ACTION.SET_NOTE, note: noteTo});
    } catch (e) {
    }
}

export function* getNoteSaga({note}) {
    console.log("new project register:",note);
    try {
        const RES = yield getNote(note);
        const {data} = RES;
        yield put({type: ACTION.SET_NOTE, note: data});
    } catch (e) {
    }
}