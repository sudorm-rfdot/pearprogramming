import React, { Component } from 'react';
import vid from './resources/Globglogabgalab.mp4';
import './App.css';

class App extends Component {
  state = {
    toggle: false,
    stuff: ''
  }

  change = (val) => {
    this.setState({
      stuff: val
    })
  }
  toggle()
  {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    return (
      <div className="App">
       <video controls src={vid}></video>
      </div>
    );
  }
}

export default App;
