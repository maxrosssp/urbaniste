import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UrbanisteGame from './UrbanisteGame';
import UrbanisteLobby from './UrbanisteLobby';
import 'status-indicator/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.scss';


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path="/game/:gameID/:playerID/:credentials" component={UrbanisteGame}/>

      <Route path="/" component={UrbanisteLobby} />
    </Switch>
  </BrowserRouter>
), document.getElementById('app'));
