import React, { Component } from 'react';
import '../styles/App.css';
import Calendar from './Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
