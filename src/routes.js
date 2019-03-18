import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';

export default(
  <Switch>
    <Route exact path='/' component={Login} />
  </Switch>
)