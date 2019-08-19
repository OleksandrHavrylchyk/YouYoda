import React from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import SendActivationEmail from './Components/SendActivationEmail';
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ResetPassword from './Components/ResetPassword';



export default function Routes() {
  return (
      <div>
        <Router>
            <Route exact path='/' component={Home}/>
            <Route path='/editprofile' component={EditPageProfile}/>
            <Route component={MainLayout}>
                <Route exact path='/reset/password'
                    render={()=><MainLayout><ResetPassword/></MainLayout>}/>
                <Route path='/reset/password/confirm'
                    render={()=><MainLayout><ConfirmSendingEmail/></MainLayout>}/>
                <Route path={'/reset/password/new/:uid/:token'}
                    render={()=><MainLayout><EnterNewPassword/></MainLayout>}/>
                <Route exact path='/activation/send/email'
                    render={()=><MainLayout><SendActivationEmail/></MainLayout>}/>
                <Route exact path='/activate/user/:uid/:token'
                    render={()=><MainLayout><ConfirmActivationEmail/></MainLayout>}/>
            </Route>
        </Router>
    </div>
  );
};
