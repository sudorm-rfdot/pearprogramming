import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    
    stuff: ''
  }

  change = (val) => {
    this.setState({
      stuff: val
    })
  }

  render() {
    return (
      <div className="App">
        
        <p>hi</p>
        <input value={this.stuff} onChange={e => this.change(e.target.value)} />
        <p>{this.state.stuff}</p>
      </div>
    );
  }
}

export default App;
