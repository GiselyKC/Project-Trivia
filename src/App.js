import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Jogo from './Pages/Jogo';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ () => <Login /> } />
          <Route path="/jogo" component={ () => <Jogo /> } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </header>
    </div>
  );
}
