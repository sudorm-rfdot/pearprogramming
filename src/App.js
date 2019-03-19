import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'
import './reset.scss'
import './App.scss';

class App extends Component {
  
  render() {
    
    return (
      <Router>
        <div id='app-parent-container'>
            <div id='content-container'>
              {routes}
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
