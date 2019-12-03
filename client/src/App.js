import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import CreateContest from './pages/CreateContest/CreateContest';
import CreateContestChooseType from './pages/CreateContest/CreateContestChooseType';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import AdminPanel from './pages/AdminPanel/Adminpanel';
import Dashboard from './pages/Dashboard/Dashboard';
import ActiveContests from './pages/ActiveContests/ActiveContests';
import {Route, Router, Switch} from "react-router-dom";
import history from './boot/browserHistory';
import CheckUser from './components/HOC/checkUser';
import {ToastContainer} from 'react-toastify';
import NotFound from './pages/NotFound/notFound';
import Contest from './pages/Contest/ContestPage';
import MailService from './components/mailService/mailService';
import Form from './components/CreatContestComponents/threeStepContestForm/threeStepContestForm'

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
                    {

                    }
                    <Route path="/" exact component={StartPage}/>
                    <Route path="/login/" exact component={Login}/>
                    <Route path="/signup/" exact component={SignUp}/>
                    <Route path="/admin_panel/" exact component={AdminPanel}/>
                    <Route path="/contest_creating_step1/" exact component={Form}/>
                    <Route path="/contest_creating/" exact component={(...props) => {
                        return <CreateContest local={props.location}/>
                    }}/>
                    <Route path="/contest_creating_choose_type/" exact component={CreateContestChooseType}/>
                    <Route path="/dashboard/" exact component={Dashboard}/>
                    <Route path="/active_contests/" component={ActiveContests}/>
                    <Route path="/contest/:id" exact component={(...props) => {
                        return <Contest id={props[0].match.params['id']}/>
                    }
                    }/>
                    <Route path="/service/:api" exact component={(...props) => {
                        return <MailService params={props[0].match.params['api']}/>
                    }
                    }/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </CheckUser>
    )
}

export default App;