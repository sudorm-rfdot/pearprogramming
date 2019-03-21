import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Editor from './Components/Editor/Editor';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile'

export default(
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/Editor' component={Editor} />
    <Route path='/Register' component={Register} />
    <Route path='/Profile' component={Profile} />
  </Switch>
)