import axios from './../axiosConfig/axiosConfig';
import {restURL} from '../baseURL';
import history from '../../boot/browserHistory';

export const userLogin = data => axios.post(`${restURL}/login`, (data));
export const userSignUpLogin = data =>axios.post(`${restURL}/user`, (data));
export const userIsLogin = () => axios.get(`${restURL}/user`);
export const logout = (data) => axios.delete(`${restURL}/user`, {data: {data}});

export const noteSave = data => axios.post(`${restURL}/note`, (data));
export const noteUpdate = data =>axios.put(`${restURL}/note/${data.id}`, (data));
export const noteDelete = (data) => axios.delete(`${restURL}/note/${data}`);
export const getNote = () => axios.get(`${restURL}/note`);//null;

/*export const contestFilter = ({url}) => {
    history.replace(`${history.location.pathname}?${url.split('?')[1]}`);
    return axios.get(url);
};*/