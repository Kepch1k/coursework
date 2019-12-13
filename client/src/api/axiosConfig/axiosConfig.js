import axios from 'axios';
import {TOKENS_KEY} from '../../constants/consts';
import {restURL} from '../baseURL';
import history from '../../boot/browserHistory';

axios.interceptors.request.use(config => {
    if (localStorage.getItem(TOKENS_KEY)) {
        config.headers.common['Authorization'] = "Bearer " + (JSON.parse(localStorage.getItem(TOKENS_KEY))).access
    } else if (sessionStorage.getItem(TOKENS_KEY)) {
        config.headers.common['Authorization'] = "Bearer " + (JSON.parse(sessionStorage.getItem(TOKENS_KEY))).access
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response,
    async (error) => {
        try {
            switch (error.response.status) {
                case 401:
                    localStorage.clear();
                    sessionStorage.clear();
                    history.push('/login');
                    break;
                case 403:
                   // console.log("error 403");
                    const token = (sessionStorage.getItem(TOKENS_KEY)) ? sessionStorage.getItem(TOKENS_KEY) : localStorage.getItem(TOKENS_KEY);
                    const {data: {tokenPair: tokens}} = await axios.post(`${restURL}/refresh`, {refresh: (JSON.parse(token)).refresh});
                    const TOKENS_JSON = JSON.stringify(tokens);
                    if (sessionStorage.getItem(TOKENS_KEY)) {
                        sessionStorage.setItem(TOKENS_KEY, TOKENS_JSON);
                        error.config.headers['Authorization'] = "Bearer " + (JSON.parse(sessionStorage.getItem(TOKENS_KEY))).access;
                    } else {
                        localStorage.setItem(TOKENS_KEY, TOKENS_JSON);
                        error.config.headers['Authorization'] = "Bearer " + (JSON.parse(localStorage.getItem(TOKENS_KEY))).access;
                    }
                    return axios.request(error.config);
                default:
                    break
            }
        } catch (err) {
        }
        return error;
    });

export default axios;

