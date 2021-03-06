import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


import About from './Pages/About';
import AdminDashboard from './Components/AdminDashboard';
import AdminPage from "./Pages/AdminPage";
import AdminPageInner from './Components/AdminPageInner';
import CreateCourse from './Components/CreateCourse'
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import CourseDetail from './Components/CourseDetail';
import CreateEventPage from "./Pages/CreateEventPage";
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import EventDetail from './Components/EventDetail';
import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import ModeratorDashboard from './Components/ModeratorDashboard';
import ModeratorPage from "./Pages/ModeratorPage";
import ModeratorPageInner from './Components/ModeratorPageInner';
import NotFoundPage from './Pages/NotFoundPage';
import Profile from './Pages/Profile';
import ResetPassword from './Components/ResetPassword';
import SendActivationEmail from './Components/SendActivationEmail';
import SearchingCourses from './Components/SearchingCourses';
import SearchingEvents from './Components/SearchingEvents';
import SearchPage from './Pages/SearchPage';
import TrainerPage from './Components/TrainerPage';
import YourEvents from "./Components/YourEvents";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory()

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/editprofile' component={EditPageProfile} />
                        <Route path='/eventcreate' component={CreateEventPage} />
                        <Route exact path='/reset/password'
                            render={() => <MainLayout><ResetPassword /></MainLayout>}
                        />
                        <Route exact path='/reset/password/confirm'
                            render={() => <MainLayout><ConfirmSendingEmail /></MainLayout>}
                        />
                        <Route exact path={'/reset/password/new/:uid/:token'}
                            render={() => <MainLayout><EnterNewPassword /></MainLayout>}
                        />
                        <Route exact path='/activation/send/email'
                            render={(props) =>
                                <MainLayout>
                                    <SendActivationEmail email={props.location.state.email} />
                                </MainLayout>}
                        />
                        <Route exact path='/activate/user/:uid/:token'
                            render={() => <MainLayout><ConfirmActivationEmail /></MainLayout>}
                        />
                        <Route exact path='/course/detail'
                            render={(props) => <MainLayout><CourseDetail course={props.location.state.course} /></MainLayout>}
                        />
                        <Route exact path="/courses/search"
                            render={() => <MainLayout><SearchingCourses /></MainLayout>}
                        />
                        <Route exact path="/events/search"
                            render={() => <MainLayout><SearchingEvents /></MainLayout>}
                        />
                        <Route exact path='/event/detail'
                            render={(props) => <MainLayout><EventDetail event={props.location.state.event} /></MainLayout>}
                        />
                        <Route exact path='/admin'
                            render={() => <AdminPage><AdminDashboard /></AdminPage>}
                        />
                        <Route exact path='/create-course'
                            render={() => <MainLayout><CreateCourse /></MainLayout>}
                        />
                        <Route exact path={'/admin/:option'}
                            render={() => <AdminPage><AdminPageInner /></AdminPage>} />
                        <Route exact path='/moderator'
                            render={() => <ModeratorPage><ModeratorDashboard /></ModeratorPage>} />
                        <Route exact path={'/moderator/:option'}
                            render={() => <ModeratorPage><ModeratorPageInner /></ModeratorPage>} />
                        <Route exact path='/about'
                            render={() => <MainLayout><About /></MainLayout>} />
                            <Route exact path='/search' component={SearchPage}/>
                        <Route exact path='/eventedit'
                            render={(props) => <MainLayout><YourEvents event={props.location.state.event} /></MainLayout>} />
                        <Route exact path="/trainer/page"
                            render={(props) => <MainLayout><TrainerPage trainer_id={props.location.state.trainer_id} /></MainLayout>}
                        />
                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
};
