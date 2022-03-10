import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/settings" component={ Settings } />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}
