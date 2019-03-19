import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Editor from './Components/Editor/Editor';

export default(
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/Editor' component={Editor} />
  </Switch>
)