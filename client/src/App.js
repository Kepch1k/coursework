import React from 'react';
import NotePage from './pages/NotePage/NotePage';
import ListOfUserNotes from './pages/ListOfUserNotes/ListOfUserNotes';
import ListOfNotesPage from './pages/ListOfNotesPage/ListOfNotesPage';
import NotFound from './pages/NotFound/NotFound';
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
                    <Route path="/note" exact component={NotePage}/>
                    {/*<Route path="/user_notes/" exact component={ListOfUserNotes}/>*/}
                    <Route path="/" exact component={ListOfNotesPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </CheckUser>
    )
}

export default App;