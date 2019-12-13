import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import {Route, Router, Switch} from "react-router-dom";
import CheckUser from './components/HOC/checkUser';
import history from './boot/browserHistory';
import { ToastContainer } from 'react-toastify';

history.listen(_ => {
    if (history.location.pathname.indexOf('active_contests') === -1) {
        window.scrollTo(0, 0)
    }

});

function App() {
    return (
        <CheckUser>
        <ToastContainer/>
        <Router history={history}>
                <Switch>
                    <Route path="/" exact component={StartPage}/>
                </Switch>
            </Router>
        </CheckUser>
    )
}

export default App;