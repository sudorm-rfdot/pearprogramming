import React, { Component } from 'react';
// import logo from './logo.svg';
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
        
        <header>This is a header</header>
        <input value={this.stuff} onChange={e => this.change(e.target.value)} />
        <p>{this.state.stuff}</p>
        <button onClick={() => this.toggle()}>
        {this.state.toggle ? 'On' : 'Off'}
        </button>
      </div>
    );
  }
}

export default App;
