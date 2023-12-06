/*global chrome*/
import React, { Component } from 'react';
import './general.css';
import AuthPage from './pages/mainAuth/authPage';
import { SecurityDomain } from '../src/content';
class App extends Component {
  render() {
    return (
      <div className="App">
          <AuthPage />
      </div>
    );
  }
}

export default App;
