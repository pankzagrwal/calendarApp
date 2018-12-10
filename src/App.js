import React, { Component } from 'react';
import Calendar from './components/calendar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/" component={Calendar} />
          {/* <Calendar /> */}
        </div>
      </Router>
    );
  }
}

export default App;
